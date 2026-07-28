// Task 13.3: Session Storage & Comparison

// Exercise: Understanding the difference

// sessionStorage - cleared when browser tab closes
sessionStorage.setItem("tempData", "This disappears on close");
console.log("Session data:", sessionStorage.getItem("tempData"));

// localStorage - persists until explicitly cleared
localStorage.setItem("permanentData", "This stays forever");
console.log("Local data:", localStorage.getItem("permanentData"));

// When to use which:
// - sessionStorage: Shopping cart (for current session)
// - sessionStorage: Form data backup (in case of accidental navigation)
// - localStorage: User preferences, theme settings
// - localStorage: Authentication tokens (with security considerations)
// - localStorage: Cached API data

console.log("--- Comparison Summary ---");
console.log("sessionStorage: cleared when tab closes, good for temporary session data");
console.log("localStorage: persists indefinitely, good for permanent user preferences");