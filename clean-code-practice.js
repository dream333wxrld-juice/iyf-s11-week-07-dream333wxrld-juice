// Task 14.2: Clean Code Practices

// Exercise 1: Meaningful Names

// BAD
const d = new Date();
console.log("Bad naming example:", d);

// GOOD
const currentDate = new Date();
console.log("Good naming example:", currentDate);

// BAD
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 16 }
];
const x = users.filter(u => u.age > 18);
console.log("Bad naming - x:", x);

// GOOD
const adultUsers = users.filter(user => user.age > 18);
console.log("Good naming - adultUsers:", adultUsers);

// BAD
function calc(a, b) { return a * b * 0.1; }
console.log("Bad function name result:", calc(100, 2));

// GOOD
function calculateDiscount(price, quantity) {
    const DISCOUNT_RATE = 0.1;
    return price * quantity * DISCOUNT_RATE;
}
console.log("Good function name result:", calculateDiscount(100, 2));


// Exercise 2: Single Responsibility

// BAD - does too many things (shown as reference, not run)
function processUserBad(userData) {
    if (!userData.email.includes("@")) throw new Error("Invalid email");
    if (userData.age < 18) throw new Error("Must be adult");
    userData.email = userData.email.toLowerCase();
    userData.name = userData.name.trim();
    console.log("Simulated save to database:", userData);
    console.log("Simulated email sent to:", userData.email);
}

// GOOD - separate concerns
function validateUser(userData) {
    if (!userData.email.includes("@")) throw new Error("Invalid email");
    if (userData.age < 18) throw new Error("Must be adult");
    return true;
}

function normalizeUser(userData) {
    return {
        ...userData,
        email: userData.email.toLowerCase(),
        name: userData.name.trim()
    };
}

function createUser(userData) {
    validateUser(userData);
    const normalizedUser = normalizeUser(userData);
    console.log("User created:", normalizedUser);
    return normalizedUser;
}

// Test
createUser({ email: "GILBERT@EXAMPLE.COM", name: "  Gilbert Mungai  ", age: 25 });


// Exercise 3: Avoid Magic Numbers

// BAD
function checkPasswordBad(password) {
    return password.length < 8;
}
console.log("Bad magic number check:", checkPasswordBad("abc"));

// GOOD
const MIN_PASSWORD_LENGTH = 8;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const HTTP_NOT_FOUND = 404;

function checkPasswordGood(password) {
    return password.length < MIN_PASSWORD_LENGTH;
}
console.log("Good named constant check:", checkPasswordGood("abc"));
console.log("One day in ms:", ONE_DAY_MS);
console.log("HTTP not found code:", HTTP_NOT_FOUND);