# Week 7: JavaScript Best Practices

## Author
- **Name:** Gilbert Mungai
- **GitHub:** [@dream333wxrld-juice](https://github.com/dream333wxrld-juice)
- **Date:** August 2, 2026

## Project Description
This week's project focuses on persisting data with localStorage and sessionStorage, structuring a larger JavaScript application into clean, organized modules, and applying professional code-quality practices. It includes a refactored, persistent To-Do List, a Shopping Cart mini-project with centralized state management, and a set of clean-code, debugging, linting, and testing exercises.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Web Storage API (localStorage & sessionStorage)
- ESLint
- Prettier
- Vitest (unit testing)

## Features
- To-Do List that persists across page refreshes using localStorage
- Add, toggle, and delete todos, with completed state and filter preference saved
- Shopping Cart with add/remove items, quantity adjustment, live total, and cart count in the header
- Cart state persists across page refreshes
- Form auto-save to sessionStorage as the user types, with data cleared on successful submit
- Theme (light/dark) toggle with persisted preference
- Recent searches feature storing the last 5 searches
- Code reorganized into modules (`app.js`, `state.js`, `storage.js`, `ui.js`, `utils.js`)
- Centralized state management using a single state object with update functions
- Pure utility functions extracted and covered by unit tests
- ESLint and Prettier configured and passing with no errors or warnings

## How to Run
1. Clone this repository
2. Open `index.html` in your browser

   OR

   Run `npm install` then `npm start`

To run the test suite:
```
npm install
npm test
```

To run the linter:
```
npm run lint
```

## Lessons Learned
- How to persist application data using localStorage, including serializing and parsing JSON since localStorage only stores strings
- The difference between localStorage and sessionStorage, and when to use each
- How to structure state management with a centralized state object and an observer/pub-sub pattern
- The value of splitting code into focused modules (state, storage, UI, utilities) instead of one large file
- Writing clean code: meaningful names, single-responsibility functions, and avoiding magic numbers
- Using browser DevTools and console methods (`console.table`, `console.group`, `console.time`, breakpoints) to debug effectively
- Setting up and using ESLint and Prettier to enforce consistent, error-free code
- Writing basic unit tests with Vitest for pure functions, including edge cases

## Challenges Faced
- Debugging an off-by-one loop error and a typo in a property name while working through the debugging exercise
- Making sure the cart and todo state stayed in sync with localStorage after every update, not just on page load
- Deciding how to split responsibilities cleanly across modules without over-engineering a small project
- Getting ESLint and Prettier configured to work together without conflicting rules

## Live Demo (if deployed)
[View Live Demo](https://github.com/dream333wxrld-juice/iyf-s11-week-07-dream333wxrld-juice )