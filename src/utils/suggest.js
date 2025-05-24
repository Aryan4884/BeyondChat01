// src/utils/suggest.js

export function generateStaticSuggestions(message = "") {
  const lower = message.toLowerCase().trim();

  // Basic keyword buckets
  const keywords = {
    cancel: ["cancel", "terminate", "end subscription", "stop service"],
    upgrade: ["upgrade", "switch plan", "increase limit"],
    refund: ["refund", "money back", "reimburse", "return payment"],
    login: ["login", "log in", "sign in", "password", "credentials", "reset password", "forgot password"],
    billing: ["billing", "invoice", "charge", "receipt", "payment"],
    trial: ["trial", "free trial", "demo", "evaluation"],
    support: ["help", "support", "contact", "assistance"],
  };

  const containsKeyword = (group) =>
    keywords[group].some((kw) => lower.includes(kw));

  if (containsKeyword("cancel")) {
    return [
      "You can cancel your subscription from the Billing Settings.",
      "Would you like me to guide you through cancelling it?",
      "Note: Once cancelled, you will still have access until the end of your current billing cycle."
    ];
  }

  if (containsKeyword("upgrade")) {
    return [
      "To upgrade your plan, visit the Subscription section in your account.",
      "Would you like assistance choosing the right plan for you?",
      "Upgrading gives you access to more features and priority support."
    ];
  }

  if (containsKeyword("refund")) {
    return [
      "Refunds are typically processed within 5–7 business days after approval.",
      "Could you please share your order ID for refund processing?",
      "If your purchase is eligible under our refund policy, we'll proceed immediately."
    ];
  }

  if (containsKeyword("login")) {
    return [
      "You can reset your password using the 'Forgot Password' link on the login screen.",
      "Let me help you recover access to your account.",
      "If you’re still facing issues, we can verify your identity via email or phone."
    ];
  }

  if (containsKeyword("billing")) {
    return [
      "You can download your billing statements from your account settings.",
      "Let me know if you need a copy of a specific invoice.",
      "We support monthly and yearly billing — would you like to switch?"
    ];
  }

  if (containsKeyword("trial")) {
    return [
      "Our free trial lasts for 14 days with full feature access.",
      "Would you like to extend or upgrade from your trial?",
      "No credit card is required to start your trial — just sign up and explore."
    ];
  }

  if (containsKeyword("support")) {
    return [
      "You can reach our support team via chat or email anytime.",
      "Is this something I can assist you with directly?",
      "We typically respond within 1 hour during business days."
    ];
  }

  // Fallback generic suggestions
  return [
    "I'm looking into that for you.",
    "Could you please clarify or provide more details?",
    "Meanwhile, you can also check our Help Center for quick answers."
  ];
}
