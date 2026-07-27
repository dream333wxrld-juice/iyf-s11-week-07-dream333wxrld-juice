// Task 13.2: Persistent To-Do List

const STORAGE_KEY = "todos";
const FILTER_KEY = "todoFilter";

// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let currentFilter = localStorage.getItem(FILTER_KEY) || "all";

// Storage helpers
function loadTodos() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function saveFilter(filter) {
    localStorage.setItem(FILTER_KEY, filter);
}

// Functions
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

function renderTodos() {
    const todos = loadTodos();
    todoList.innerHTML = "";

    let filteredTodos = todos;
    if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });

    updateStats(todos);
}

function addTodo(text) {
    const todos = loadTodos();
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    saveTodos(todos);
    renderTodos();
}

function toggleTodo(id) {
    const todos = loadTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos();
    }
}

function deleteTodo(id) {
    let todos = loadTodos();
    todos = todos.filter(t => t.id !== id);
    saveTodos(todos);
    renderTodos();
}

function updateStats(todos) {
    const activeCount = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

function filterTodos(filter) {
    currentFilter = filter;
    saveFilter(filter);
    filters.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[data-filter="${filter}"]`).classList.add("active");
    renderTodos();
}

// Event Listeners
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text === "") return;
    addTodo(text);
    input.value = "";
    input.focus();
});

todoList.addEventListener("click", function(event) {
    const li = event.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (event.target.classList.contains("task-delete-btn")) {
        deleteTodo(id);
    } else {
        toggleTodo(id);
    }
});

filters.forEach(btn => {
    btn.addEventListener("click", function() {
        filterTodos(btn.dataset.filter);
    });
});

clearCompletedBtn.addEventListener("click", function() {
    let todos = loadTodos();
    todos = todos.filter(todo => !todo.completed);
    saveTodos(todos);
    renderTodos();
});

// Initialize - restore filter and render
document.addEventListener("DOMContentLoaded", () => {
    filters.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === currentFilter);
    });
    renderTodos();
});