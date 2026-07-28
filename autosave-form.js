// Task 13.3: Auto-Save Form using sessionStorage

const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");
const status = document.getElementById("status");

// Load saved values on page load
inputs.forEach(input => {
    const saved = sessionStorage.getItem(`form_${input.name}`);
    if (saved) {
        input.value = saved;
    }

    // Save on every input
    input.addEventListener("input", () => {
        sessionStorage.setItem(`form_${input.name}`, input.value);
        showStatus("Draft saved");
    });
});

function showStatus(message) {
    status.textContent = message;
    setTimeout(() => {
        status.textContent = "";
    }, 1500);
}

// Clear on successful submit
form.addEventListener("submit", function(event) {
    event.preventDefault();

    inputs.forEach(input => {
        sessionStorage.removeItem(`form_${input.name}`);
    });

    form.reset();
    showStatus("Form submitted! Draft cleared.");
});

// Show a message if there was a recovered draft
window.addEventListener("DOMContentLoaded", () => {
    const hasSavedData = Array.from(inputs).some(input =>
        sessionStorage.getItem(`form_${input.name}`)
    );
    if (hasSavedData) {
        showStatus("Draft recovered from earlier session");
    }
});