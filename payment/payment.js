document.getElementById("payNowBtn").onclick = function () {
  const options = {
    key: "rzp_test_YourApiKeyHere", // Replace with your Razorpay Test Key
    amount: 9900, // ₹99 in paise
    currency: "INR",
    name: "EvalAI",
    description: "10 Evaluation Credits",
    image: "https://yourdomain.com/logo.svg",
    handler: function (response) {
      document.getElementById("payment-status").innerText =
        "✅ Payment successful! Redirecting...";

      // Store paid flag and redirect
      localStorage.setItem("paid", "true");
      setTimeout(() => {
        window.location.href = "upload.html";
      }, 2000);
    },
    prefill: {
      name: "Nyasa Vishwas",
      email: "nyasa@example.com",
    },
    theme: {
      color: "#6a5af9",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
};
