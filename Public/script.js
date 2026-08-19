const chatButton = document.getElementById("chatButton");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const chatBody = document.getElementById("chatBody");


// Open chatbot
chatButton.addEventListener("click", () => {
    chatWindow.classList.add("active");
});


// Close chatbot
closeChat.addEventListener("click", () => {
    chatWindow.classList.remove("active");
});


// Send message
function sendMessage() {

    const message = chatInput.value.trim();

    if (message === "") return;


    // User message
    const userMessage = document.createElement("div");

    userMessage.className = "user-message";
    userMessage.textContent = message;

    chatBody.appendChild(userMessage);

    chatInput.value = "";

    chatBody.scrollTop = chatBody.scrollHeight;


    // Simple bot response
    setTimeout(() => {

        const botMessage = document.createElement("div");

        botMessage.className = "bot-message";

        botMessage.textContent =
            "Thanks for reaching out! Tell me whether you need a website, social media management, WhatsApp management, or a pricing recommendation.";

        chatBody.appendChild(botMessage);

        chatBody.scrollTop = chatBody.scrollHeight;

    }, 600);
}


// Send with button
sendButton.addEventListener("click", sendMessage);


// Send with Enter
chatInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// Quick buttons
document.querySelectorAll(".quick-buttons button").forEach(button => {

    button.addEventListener("click", () => {

        chatInput.value = button.textContent;

        sendMessage();
async function startPayment(plan) {

    try {

        // =========================
        // 1. CREATE ORDER
        // =========================

        const response =
            await fetch("/create-order", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    plan: plan
                })

            });


        const order =
            await response.json();


        if (!order.success) {

            alert(order.message);

            return;

        }


        // =========================
        // 2. RAZORPAY CHECKOUT
        // =========================

        const options = {

            key: order.key_id,

            amount: order.amount,

            currency: order.currency,

            name: "V² Digital Agency",

            description:
                order.plan + " Plan",

            order_id:
                order.order_id,


            handler: async function (payment) {

                // =========================
                // 3. VERIFY PAYMENT
                // =========================

                const verifyResponse =
                    await fetch(
                        "/verify-payment",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                razorpay_payment_id:
                                    payment.razorpay_payment_id,

                                razorpay_order_id:
                                    payment.razorpay_order_id,

                                razorpay_signature:
                                    payment.razorpay_signature

                            })

                        }
                    );


                const result =
                    await verifyResponse.json();


                // =========================
                // 4. OPEN DASHBOARD
                // =========================

                if (result.success) {

                    window.location.href =
                        result.redirect;

                }

                else {

                    alert(
                        "Payment verification failed."
                    );

                }

            },


            prefill: {

                name: "",

                email: "",

                contact: ""

            },


            theme: {

                color: "#2463eb"

            }

        };


        const razorpay =
            new Razorpay(options);


        razorpay.open();

    }

    catch (error) {

        console.error(error);

        alert(
            "Something went wrong. Please try again."
        );

    }

}
    });

});