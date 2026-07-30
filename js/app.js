// app.js - Main entry point

import { state, addTodo, setFilter, clearCompleted } from './state.js';
import { renderTodos, setupTodoListListeners } from './ui.js';

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text === "") return;
    addTodo(text);
    renderTodos();
    input.value = "";
    input.focus();
});

filters.forEach(btn => {
    btn.addEventListener("click", function() {
        setFilter(btn.dataset.filter);
        renderTodos();
    });
});

clearCompletedBtn.addEventListener("click", function() {
    clearCompleted();
    renderTodos();
});

setupTodoListListeners();

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderTodos();
});