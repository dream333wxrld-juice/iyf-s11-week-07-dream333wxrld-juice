// Task 14.3: Debugging Skills

// Exercise 1: Console Methods

console.log("Basic message");

console.log("%cImportant!", "color: red; font-size: 20px;");

console.warn("This might be a problem");
console.error("This is definitely wrong");

const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];
console.table(users);

console.group("User Processing");
console.log("Step 1: Validate user");
console.log("Step 2: Save user");
console.groupEnd();

console.time("loopTest");
for (let i = 0; i < 100000; i++) {}
console.timeEnd("loopTest");

const x = 5;
console.assert(x > 0, "x should be positive");
console.assert(x < 0, "This assertion will fail and show a message");

console.trace("How did we get here?");


// Exercise 3: Debug This Code

// ORIGINAL BUGGY VERSION (commented out - has 3 bugs):
// function calculateOrderTotal(items) {
//     let total = 0;
//     for (let i = 0; i <= items.length; i++) {   // BUG 1: <= should be 
//         const item = items[i];
//         total += item.price * item.quanity;      // BUG 2: typo "quanity" should be "quantity"
//     }
//     if (total > 100) {
//         total = total * 0.9;
//     }
//     return total;
// }

// FIXED VERSION:
function calculateOrderTotal(items) {
    let total = 0;

    for (let i = 0; i < items.length; i++) {   // FIX 1: changed <= to 
        const item = items[i];
        total += item.price * item.quantity;    // FIX 2: fixed typo "quanity" -> "quantity"
    }

    if (total > 100) {
        total = total * 0.9;
    }

    return total;
}

const order = [
    { name: "Book", price: 15, quantity: 2 },
    { name: "Pen", price: 3, quantity: 5 },
    { name: "Notebook", price: 8, quantity: 3 }
];

console.log("Fixed order total:", calculateOrderTotal(order));
// Expected: 69 (before discount, since 69 < 100, no discount applied)

// Bugs found and fixed:
// 1. Loop condition "i <= items.length" caused an out-of-bounds access
//    (accessing items[items.length] which is undefined), fixed to "i < items.length"
// 2. Typo "item.quanity" should be "item.quantity" - this was reading
//    an undefined property, resulting in NaN