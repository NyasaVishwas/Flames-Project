document.getElementById("payNowBtn").onclick = function () {
  const payBtn = document.getElementById("payNowBtn");
  payBtn.disabled = true;
  payBtn.innerText = "Processing...";
  
  const options = {
    key: "rzp_test_YourApiKeyHere", // Replace with your Razorpay Test Key
    amount: 9900, // ₹99 in paise
    currency: "INR",
    name: "EvalAI",
    description: "10 Evaluation Credits",
    image: "https://yourdomain.com/logo.svg",
    handler: function (response) {
      const status = document.getElementById("payment-status");
      status.innerText = "✅ Payment successful! Redirecting...";
      status.style.opacity = 1;
      
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
      color: "#5b4cf8",
    },
    modal: {
      ondismiss: function () {
        payBtn.disabled = false;
        payBtn.innerText = "Pay Securely with Razorpay";
      }
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
};