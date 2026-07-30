// ui.js - DOM manipulation

import { state, toggleTodo, deleteTodo } from './state.js';

const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    if (todo.completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "task-delete-btn";

    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

export function renderTodos() {
    todoList.innerHTML = "";

    let filteredTodos = state.todos;
    if (state.filter === "active") {
        filteredTodos = state.todos.filter(todo => !todo.completed);
    } else if (state.filter === "completed") {
        filteredTodos = state.todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });

    updateStats();
    updateActiveFilterButton();
}

function updateStats() {
    const activeCount = state.todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

function updateActiveFilterButton() {
    filters.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === state.filter);
    });
}

export function setupTodoListListeners() {
    todoList.addEventListener("click", function(event) {
        const li = event.target.closest("li");
        if (!li) return;

        const id = Number(li.dataset.id);

        if (event.target.classList.contains("task-delete-btn")) {
            deleteTodo(id);
        } else {
            toggleTodo(id);
        }

        renderTodos();
    });
}