const chatButton = document.getElementById("chatButton");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const chatBody = document.getElementById("chatBody");

// A Razorpay Key ID is public. Never place the Razorpay Key Secret in browser code.
const RAZORPAY_KEY_ID = "rzp_test_TRf0GROR8nSgHt";

const offers = {
    starter: {
        title: "Website Management",
        price: 4999,
        label: "Starter Plan",
        description: "A polished website presence with ongoing support for your business.",
        benefits: ["Website development", "Content updates", "Monthly support"]
    },
    growth: {
        title: "Lead Generation Growth Bundle",
        price: 12999,
        label: "Growth Plan",
        description: "A focused combination to attract leads and follow up with them faster.",
        benefits: ["Instagram Reels strategy", "WhatsApp lead follow-up", "Website support"]
    },
    complete: {
        title: "Complete Digital Management",
        price: 24999,
        label: "Complete Plan",
        description: "Full digital support for businesses that want everything handled.",
        benefits: ["Content and social media", "Website and lead support", "Dedicated assistance"]
    },
    reels: {
        title: "Instagram Reels Management",
        price: 2999,
        label: "Starting service",
        description: "Complete video editing, scheduling, engaging copy, and trending audio sourcing.",
        benefits: ["Reel editing", "Captions and scheduling", "Trend research"]
    },
    whatsapp: {
        title: "WhatsApp Management",
        price: 1999,
        label: "Starting service",
        description: "Stay responsive and organised with business communication support.",
        benefits: ["Customer replies", "Message organisation", "Business support"]
    }
};

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = type + "-message";
    message.textContent = text;
    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function formatPrice(amount) {
    return "₹" + amount.toLocaleString("en-IN");
}

function addOfferCard(offerKey) {
    const offer = offers[offerKey];
    if (!offer) return;

    const card = document.createElement("article");
    card.className = "chat-offer-card";

    const heading = document.createElement("div");
    heading.className = "chat-offer-heading";
    const label = document.createElement("span");
    label.textContent = offer.label;
    const price = document.createElement("strong");
    price.textContent = formatPrice(offer.price);
    heading.append(label, price);

    const title = document.createElement("h4");
    title.textContent = offer.title;
    const description = document.createElement("p");
    description.textContent = offer.description;
    const benefits = document.createElement("p");
    benefits.className = "chat-offer-benefits";
    benefits.textContent = offer.benefits.join(" · ");
    const payButton = document.createElement("button");
    payButton.type = "button";
    payButton.className = "chat-payment-button";
    payButton.textContent = "Pay " + formatPrice(offer.price) + " with Razorpay";
    payButton.addEventListener("click", () => startPayment(offerKey));

    card.append(heading, title, description, benefits, payButton);
    chatBody.appendChild(card);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getReply(text) {
    const message = text.toLowerCase();
    if (message.includes("lead") || message.includes("customer") || message.includes("sales")) {
        return { text: "To get more leads, I recommend combining Reels for reach, a clear website for trust, and WhatsApp for fast follow-up.", offer: "growth" };
    }
    if (message.includes("reel") || message.includes("instagram")) {
        return { text: "Instagram Reels can help you reach new people consistently. Here is a good starting service.", offer: "reels" };
    }
    if (message.includes("whatsapp")) {
        return { text: "WhatsApp Management helps you respond faster and keep customer conversations organised.", offer: "whatsapp" };
    }
    if (message.includes("website")) {
        return { text: "Website Management is a great fit for a professional, supported online presence.", offer: "starter" };
    }
    if (message.includes("price") || message.includes("pricing") || message.includes("plan")) {
        return { text: "Here are our most popular ways to get started.", offers: ["starter", "growth", "complete"] };
    }
    if (message.includes("service")) {
        return { text: "We provide Website Development, Instagram Reels Management, WhatsApp Management, YouTube Shorts, Job Search & Matching and Digital Solutions." };
    }
    if (message.includes("contact") || message.includes("help") || message.includes("talk")) {
        return { text: "Please contact our V² Digital Agency team through the Contact section." };
    }
    return { text: "Tell me your goal—such as website management, Instagram Reels, WhatsApp support, or getting more leads—and I’ll suggest the right option." };
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    window.setTimeout(() => {
        const reply = getReply(text);
        addMessage(reply.text, "bot");
        if (reply.offer) addOfferCard(reply.offer);
        if (reply.offers) reply.offers.forEach(addOfferCard);
    }, 350);
}

function startPayment(offerKey) {
    const offer = offers[offerKey];
    if (!offer) return;

    if (RAZORPAY_KEY_ID === "rzp_test_REPLACE_WITH_YOUR_KEY_ID") {
        alert("Add your Razorpay Test Mode Key ID in script.js before opening Checkout.");
        return;
    }
    if (typeof Razorpay === "undefined") {
        alert("Razorpay Checkout could not load. Check your internet connection and try again.");
        return;
    }

    const razorpay = new Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: offer.price * 100,
        currency: "INR",
        name: "V² Digital Agency",
        description: offer.title,
        theme: { color: "#2463eb" },
        handler: () => {
            window.location.assign("/dashboard.html?service=" + encodeURIComponent(offer.title) + "&amount=" + offer.price);
        },
        modal: {
            ondismiss: () => console.info("Razorpay Checkout closed.")
        }
    });

    razorpay.on("payment.failed", () => {
        alert("Payment failed. Please try again or contact support.");
    });
    razorpay.open();
}

chatButton.addEventListener("click", () => chatWindow.classList.toggle("active"));
closeChat.addEventListener("click", () => chatWindow.classList.remove("active"));
sendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendMessage();
});

document.querySelectorAll(".quick-buttons button").forEach((button) => {
    button.addEventListener("click", () => {
        chatInput.value = button.textContent;
        sendMessage();
    });
});

document.querySelectorAll("[data-plan]").forEach((button) => {
    button.addEventListener("click", () => startPayment(button.dataset.plan));
});

const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginStatus = document.getElementById("loginStatus");

function openLogin() {
    loginModal.classList.add("is-open");
    loginModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    loginStatus.textContent = "";
    window.setTimeout(() => loginEmail.focus(), 50);
}

function closeLogin() {
    loginModal.classList.remove("is-open");
    loginModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-login-trigger]").forEach((button) => {
    button.addEventListener("click", openLogin);
});

document.querySelectorAll("[data-login-close]").forEach((button) => {
    button.addEventListener("click", closeLogin);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && loginModal.classList.contains("is-open")) closeLogin();
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginStatus.textContent = "Client login is ready to connect to your backend.";
});

// Service cards share one details panel, keeping users on this page.
const serviceDetails = {
    reels: {
        name: "Instagram Reels Management",
        price: 2999,
        description: "Complete video editing, scheduling, writing engaging copy, and trending audio sourcing.",
        includes: ["Reel editing", "Captions/copy", "Scheduling", "Trending audio research", "Content optimization"],
        value: "Build a consistent short-form presence with content designed to hold attention and reach the right audience."
    },
    whatsapp: {
        name: "WhatsApp Management",
        price: 1999,
        description: "Setting up autoresponders, customer query redirection, and bulk messaging pipelines.",
        includes: ["WhatsApp automation", "Autoresponders", "Customer query handling", "Message redirection", "Bulk messaging workflow"],
        value: "Reply faster, keep conversations organised, and create a smoother experience for every customer."
    },
    website: {
        name: "Website Development",
        price: 4999,
        description: "Stunning responsive designs, modern SaaS architectures, and custom layouts optimized for speed.",
        includes: ["Responsive design", "Modern UI", "Custom pages", "Performance optimization", "Deployment support"],
        value: "Get a professional site that looks credible on every device and is built around your business goals."
    },
    youtube: {
        name: "YouTube Shorts",
        price: 3999,
        description: "Grow organic reach with rapid editing, high-retention titles, and viral short-form structures.",
        includes: ["Shorts editing", "Hooks", "Captions", "Titles", "High-retention structure"],
        value: "Turn ideas into fast, focused videos that are made to capture attention in the first few seconds."
    },
    jobs: {
        name: "Job Search & Matching",
        price: 2999,
        description: "Hand-picked roles tailored to the exact profile across platforms like LinkedIn and Indeed.",
        includes: ["Job discovery", "Profile-based matching", "Relevant job filtering", "Application opportunities", "Career assistance"],
        value: "Spend less time searching and focus on roles that match your profile, experience, and goals."
    },
    solutions: {
        name: "Digital Solutions",
        price: 5999,
        description: "Custom digital solutions designed to simplify the business and improve productivity.",
        includes: ["Digital automation", "Custom tools", "Business workflows", "Productivity solutions", "Custom digital problem solving"],
        value: "Solve the digital bottlenecks holding your business back with a solution built around how you work."
    }
};

const detailsSection = document.getElementById("service-details");
const detailsName = document.getElementById("selected-service-name");
const detailsDescription = document.getElementById("selected-service-description");
const detailsIncludes = document.getElementById("selected-service-includes");
const detailsValue = document.getElementById("selected-service-value");
const detailsPrice = document.getElementById("selected-service-price");

function showServiceDetails(serviceKey) {
    const service = serviceDetails[serviceKey];
    if (!service) return;

    detailsName.textContent = service.name;
    detailsDescription.textContent = service.description;
    detailsValue.textContent = service.value;
    detailsPrice.textContent = formatPrice(service.price);
    detailsIncludes.replaceChildren();

    service.includes.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        detailsIncludes.appendChild(listItem);
    });

    document.querySelectorAll("[data-service-card]").forEach((card) => {
        card.classList.toggle("is-selected", card.dataset.serviceCard === serviceKey);
    });

    detailsSection.hidden = false;
    detailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll("[data-service-details]").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        showServiceDetails(link.dataset.serviceDetails);
    });
});
