// VYRA settings. Fill these in to switch on accounts that sync across devices,
// the admin panel and Pro plans. Leave the placeholder values and VYRA runs in
// local mode (accounts and data stay in each browser).
//
// The Firebase "apiKey" below is NOT a secret. It only identifies your project.
// What protects your data is the rules in firestore.rules.
window.VYRA_CONFIG = {
  firebase: {
    apiKey: "PASTE_YOUR_API_KEY",
    authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "PASTE_YOUR_PROJECT_ID",
    storageBucket: "PASTE_YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "PASTE_YOUR_SENDER_ID",
    appId: "PASTE_YOUR_APP_ID"
  },
  // Optional: a Razorpay Payment Link (or any payment page) for the Pro plan.
  // Leave empty to show a simple "Request Pro access" button instead.
  paymentLink: "",
  proPrice: "Rs. 99 per month"
};
