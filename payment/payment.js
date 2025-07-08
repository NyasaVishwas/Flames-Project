document.querySelectorAll('.pay-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const plan = this.getAttribute('data-plan');
    if (plan === 'enterprise') {
      window.location.href = 'mailto:sales@evalai.com?subject=Enterprise Plan Inquiry';
      return;
    }

    this.disabled = true;
    this.innerText = 'Processing...';

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: plan === "pro" ? 49900 : 149900, // in paise
      currency: "INR",
      name: "EvalAI",
      description: `Subscription: ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
      image: "https://yourdomain.com/logo.svg",
      handler: function (response) {
        alert(`Payment successful for ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan! Payment ID: ${response.razorpay_payment_id}`);
        btn.disabled = false;
        btn.innerText = plan === 'pro' ? 'Upgrade to Pro' : 'Contact Sales';
        // Call your backend here to activate subscription
      },
      prefill: {
        name: "",
        email: "",
      },
      theme: {
        color: "#2e2a8a",
      },
      modal: {
        ondismiss: function () {
          btn.disabled = false;
          btn.innerText = plan === 'pro' ? 'Upgrade to Pro' : 'Contact Sales';
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });
});