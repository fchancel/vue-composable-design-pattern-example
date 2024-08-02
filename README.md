# VContextMenu Component

## Overview

The `VContextMenu` component is designed to demonstrate the composable design pattern in Vue.js by providing a reusable and modular component. The component displays a contextual menu with a word definition whenever text within a paragraph is selected. This approach makes the codebase more maintainable, scalable, and easier to test.

## Project Structure

The project is structured into several key files and composables:

- `VContextMenu.vue`: The main component file.
- `useClickOutside.ts`: A composable to handle clicks outside the context menu.
- `useDefinition.ts`: A composable to fetch and manage word definitions.
- `useTextSelected.ts`: A composable to manage text selection.

### Design Choices

#### 1. Composable Design Pattern

The composable design pattern is an approach in Vue.js that allows for flexible and modular reuse of logic across components. This pattern is based on the concept of composition functions (composables) which encapsulate reusable logic that can be shared between multiple components.

**Principle**

The main idea behind the composable design pattern is to separate the user interface logic into small, independent functions that can be reused in different components. These functions, often called "composables", are created outside of Vue components and can be imported and used wherever needed.

**Advantages**

- **Reusability**: Composables enable easy reuse of logic without duplicating code in each component.
- **Modularity**: Separating logic from the view makes the code more modular and maintainable.
- **Testability**: Composables, being simple functions, are easier to test independently of Vue components.
- **Readability**: The code becomes more readable and understandable as each composable has a unique and well-defined responsibility.

#### 2. Separation of Concerns

By using composables, we ensure that each piece of functionality is isolated and focused on a single task. This separation of concerns makes the codebase more modular and easier to manage. Each composable is responsible for a distinct part of the functionality:

- `useClickOutside.ts` handles detecting clicks outside of the context menu.
- `useDefinition.ts` manages the logic for fetching and displaying word definitions.
- `useTextSelected.ts` deals with text selection within the paragraph.

This design choice aligns with the principles of clean architecture and makes it easier to debug, extend, and test the code.

## Running the Project

To test the code locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Run the development server:
    ```sh
    npm run dev
    ```

This will start the project in development mode, and you can view the component in action in your browser.
