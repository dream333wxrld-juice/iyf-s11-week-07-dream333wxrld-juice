// Task 13.4: State Management Patterns

// Exercise 1: Centralized State
const state = {
    todos: [],
    filter: "all",
    theme: "light"
};

function setState(updates) {
    Object.assign(state, updates);
    saveState();
    render();
}

function setFilter(filter) {
    setState({ filter });
}

function addTodo(text) {
    setState({
        todos: [...state.todos, { id: Date.now(), text, completed: false }]
    });
}

function toggleTodo(id) {
    setState({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    });
}

function saveState() {
    localStorage.setItem("appState", JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem("appState");
    if (saved) {
        Object.assign(state, JSON.parse(saved));
    }
}

function render() {
    console.log("Rendering with state:", state);
}

// Test the centralized state pattern
loadState();
addTodo("Learn state management");
setFilter("active");
console.log("Final state:", state);


// Exercise 2: Observer Pattern
const createStore = (initialState) => {
    let internalState = initialState;
    const listeners = [];

    return {
        getState: () => internalState,

        setState: (updates) => {
            internalState = { ...internalState, ...updates };
            listeners.forEach(listener => listener(internalState));
        },

        subscribe: (listener) => {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                listeners.splice(index, 1);
            };
        }
    };
};

// Usage
const store = createStore({ count: 0 });

function renderUI(currentState) {
    console.log("UI updated with count:", currentState.count);
}

const unsubscribe = store.subscribe(newState => {
    console.log("State changed:", newState);
    renderUI(newState);
});

store.setState({ count: 1 });
store.setState({ count: 2 });

unsubscribe();

// This won't trigger the listener since we unsubscribed
store.setState({ count: 3 });
console.log("Final store state (no listener triggered):", store.getState());