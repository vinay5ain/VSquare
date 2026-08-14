const services = {

    instagram: {
        name: "Instagram Reels Management",
        price: 2999,
        keywords: [
            "instagram",
            "insta",
            "reels",
            "posting",
            "social media"
        ]
    },

    whatsapp: {
        name: "WhatsApp Management",
        price: 1999,
        keywords: [
            "whatsapp",
            "whatsapp business",
            "messages"
        ]
    },

    website: {
        name: "Website Development & Management",
        price: 4999,
        keywords: [
            "website",
            "web",
            "site"
        ]
    },

    youtube: {
        name: "YouTube Shorts Management",
        price: 3999,
        keywords: [
            "youtube",
            "youtube shorts",
            "shorts"
        ]
    },

    jobs: {
        name: "Job Search & Matching",
        price: 2999,
        keywords: [
            "job",
            "jobs",
            "career",
            "job search"
        ]
    },

    applications: {
        name: "Job Application Management",
        price: 4999,
        keywords: [
            "apply",
            "application",
            "applications",
            "apply jobs"
        ]
    }

};


function addMessage(text, type) {

    const chat = document.getElementById("chat");

    const message = document.createElement("div");

    message.className = `message ${type}`;

    message.innerHTML = text;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}


function detectServices(text) {

    text = text.toLowerCase();

    const detected = [];

    for (const key in services) {

        const service = services[key];

        const found = service.keywords.some(keyword =>
            text.includes(keyword)
        );

        if (found) {
            detected.push(key);
        }
    }

    return detected;
}


function sendMessage() {

    const input = document.getElementById("userInput");

    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    setTimeout(() => {

        generateRecommendation(text);

    }, 600);
}


function generateRecommendation(text) {

    const detected = detectServices(text);

    if (detected.length === 0) {

        addMessage(
            `I understand 👍<br><br>
            Tell me a little more about your problem.
            <br><br>
            For example:<br>
            • Instagram management<br>
            • WhatsApp<br>
            • Website<br>
            • YouTube Shorts<br>
            • Finding jobs`,
            "bot"
        );

        return;
    }


    let total = 0;

    let serviceList = "";

    detected.forEach(key => {

        const service = services[key];

        total += service.price;

        serviceList += `
            <li>${service.name}</li>
        `;
    });


    let packageName = "Custom 0-Stress Pack";


    if (
        detected.includes("instagram") &&
        detected.includes("whatsapp")
    ) {

        packageName = "Business 0-Stress Pack";

    }


    if (
        detected.includes("youtube")
    ) {

        packageName = "Creator Pack";

    }


    if (
        detected.includes("jobs") ||
        detected.includes("applications")
    ) {

        packageName = "Career Guide Pack";

    }


    addMessage(

        `
        <b>I've found the digital stress points 🎯</b>

        <div class="package">

            <h3>${packageName}</h3>

            <ul>
                ${serviceList}
            </ul>

            <div class="price">
                ₹${total.toLocaleString("en-IN")}
                <small>/month</small>
            </div>

            <p>
                Custom recommendation based on your needs.
            </p>

            <button
                class="pay-btn"
                onclick="payNow(${total})"
            >
                💳 Pay ₹${total.toLocaleString("en-IN")}
            </button>

            <button
                class="contact-btn"
                onclick="contactVSquare()"
            >
                📞 Talk to VSquare
            </button>

        </div>
        `,

        "bot"
    );
}


function payNow(amount) {

    /*
        DEMO PAYMENT

        Replace this with your actual
        Razorpay / Stripe / payment-page URL.

        NEVER put secret API keys here.
    */

    const paymentURL =
        "https://example.com/payment?amount=" + amount;

    window.open(paymentURL, "_blank");
}


function contactVSquare() {

    const phone = "YOUR_WHATSAPP_NUMBER";

    const message =
        "Hi VSquare, I want to discuss my 0 Digital Stress package.";

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}


document
    .getElementById("userInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            sendMessage();
        }

    });