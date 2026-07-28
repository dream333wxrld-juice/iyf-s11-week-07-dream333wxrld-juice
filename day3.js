// Day 3: Form Auto-Save (saves every 5 seconds + on input, recovers on refresh, clears on submit)

const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");
const status = document.getElementById("status");

// Load saved values on page load (recovery)
function recoverFormData() {
    let recovered = false;
    inputs.forEach(input => {
        const saved = sessionStorage.getItem(`day3_${input.name}`);
        if (saved) {
            input.value = saved;
            recovered = true;
        }
    });
    if (recovered) {
        showStatus("Draft recovered from earlier session");
    }
}

// Save all form fields to sessionStorage
function saveFormData() {
    inputs.forEach(input => {
        sessionStorage.setItem(`day3_${input.name}`, input.value);
    });
}

function showStatus(message) {
    status.textContent = message;
    setTimeout(() => {
        status.textContent = "";
    }, 2000);
}

// Auto-save every 5 seconds
setInterval(() => {
    saveFormData();
    showStatus("Auto-saved");
}, 5000);

// Also save immediately on input for responsiveness
inputs.forEach(input => {
    input.addEventListener("input", saveFormData);
});

// Clear on successful submit
form.addEventListener("submit", function(event) {
    event.preventDefault();

    inputs.forEach(input => {
        sessionStorage.removeItem(`day3_${input.name}`);
    });

    form.reset();
    showStatus("Form submitted! Draft cleared.");
});

// Recover data when page loads
window.addEventListener("DOMContentLoaded", recoverFormData);