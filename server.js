const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in environment variables.");
    process.exit(1);
}

const app = express();
const publicPath = path.join(__dirname, "Public");

app.use(express.json());
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


// ===============================
// PLAN PRICES
// ===============================

const plans = {
    starter: {
        name: "Starter",
        amount: 4999
    },

    growth: {
        name: "Growth",
        amount: 12999
    },

    complete: {
        name: "Complete",
        amount: 24999
    }
};

// Kept in memory for this small starter project. Use a database in production.
const pendingOrders = new Map();


// ===============================
// CREATE RAZORPAY ORDER
// ===============================

app.post("/create-order", async (req, res) => {

    try {

        const { plan } = req.body;

        if (!plans[plan]) {
            return res.status(400).json({
                success: false,
                message: "Invalid plan"
            });
        }


        const selectedPlan = plans[plan];

        const options = {
            amount: selectedPlan.amount * 100,
            currency: "INR",

            receipt:
                "V2_" +
                Date.now(),

            notes: {
                plan: plan,
                company: "V² Digital Agency"
            },

            payment_capture: 1
        };


        const order =
            await razorpay.orders.create(options);

        pendingOrders.set(order.id, plan);


        res.json({
            success: true,

            order_id: order.id,

            amount: order.amount,

            currency: order.currency,

            plan: selectedPlan.name,

            key_id:
                process.env.RAZORPAY_KEY_ID
        });

    }

    catch (error) {

        console.error("Unable to create payment order:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to create payment order"
        });

    }

});


// ===============================
// VERIFY PAYMENT
// ===============================

app.post("/verify-payment", async (req, res) => {

    try {

        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } = req.body;

        const plan = pendingOrders.get(razorpay_order_id);

        if (!plan || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment details"
            });
        }


        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;


        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(body)
                .digest("hex");


        const expectedBuffer = Buffer.from(expectedSignature, "utf8");
        const receivedBuffer = Buffer.from(razorpay_signature, "utf8");
        const isValid = expectedBuffer.length === receivedBuffer.length &&
            crypto.timingSafeEqual(expectedBuffer, receivedBuffer);


        if (!isValid) {

            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });

        }


        // Payment is genuine. Save the payment details to a database here in production.
        pendingOrders.delete(razorpay_order_id);


        res.json({
            success: true,
            message: "Payment verified successfully",

            redirect: "./dashboard.html"
        });

    }

    catch (error) {

        console.error("Payment verification error:", error.message);

        res.status(500).json({
            success: false,
            message: "Verification error"
        });

    }

});


app.use(express.static(publicPath));

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`V² Digital Agency running on http://localhost:${PORT}`);
});
