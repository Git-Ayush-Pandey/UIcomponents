 This project contains two reusable React components built with React, Vite, TailwindCSS, Storybook, and Vitest.  

The goal of the assignment was to implement:  
-  Two working UI components  
-  Example usage via Storybook  
-  Basic documentation and testing  

## Components  

1. InputField  
An accessible and reusable text input with label, helper text, and error state.  

2. DataTable
A flexible, sortable, and selectable table component.

## Approach

- **InputField** was designed to be accessible, flexible, and reusable. 
  - Supports variants (`outlined`, `filled`, `ghost`), sizes, helper/error text, password visibility toggle, clear button, and loading state.
  - Accessibility: labels, `aria-*` attributes, error associations.

- **DataTable** was built for displaying structured data with sorting and selection.
  - Sorting: toggles asc/desc on column header click.
  - Selection: supports row selection and “select all”.
  - States: handles loading and empty data gracefully.

- **Storybook** was used to document components and their different states.
- **Vitest + Testing Library** were used for unit testing to ensure reliability.
- **TailwindCSS** was used for consistent styling and utility-first design.
