// Task 13.1: Local Storage Basics

// Exercise 1: Getting Started with localStorage
localStorage.setItem("username", "Gilbert");
const username = localStorage.getItem("username");
console.log(username);

localStorage.removeItem("username");

if (localStorage.getItem("username")) {
    console.log("User exists");
} else {
    console.log("No user found");
}

// Exercise 2: Storing Objects (JSON)
const user = {
    name: "Gilbert",
    age: 25,
    hobbies: ["coding", "gaming"]
};

// WRONG way (for demonstration)
localStorage.setItem("userWrong", user);
console.log("Wrong way:", localStorage.getItem("userWrong"));

// RIGHT way - serialize to JSON
localStorage.setItem("user", JSON.stringify(user));
const retrieved = JSON.parse(localStorage.getItem("user"));
console.log("Right way:", retrieved);

// Exercise 3: Helper Functions
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// Usage
saveToStorage("settings", { theme: "dark", fontSize: 16 });
const settings = getFromStorage("settings", { theme: "light", fontSize: 14 });
console.log("Settings:", settings);