let razorpayLoader: Promise<boolean> | null = null;

export function loadRazorpay() {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (document.getElementById("razorpay-sdk")) {
    return Promise.resolve(true);
  }

  if (!razorpayLoader) {
    razorpayLoader = new Promise<boolean>((resolve) => {
      const script = document.createElement("script");

      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  }

  return razorpayLoader;
}