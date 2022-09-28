# Getting Started with Create React App

Question A: in `callbackHellFix.js`.

Assumptions:

- Some rudimentary styling with Tailwindcss. I used an `@apply` directive, since I felt that adding all those classes in components would unnecessarily pollute the file. This way, I can still utilise Tailwind as well as BEM naming to describe the structure of the component.
- Some basic tests testing if elements are rendered correctly on the basis of passed props as well as some user interactions. Additionally, I threw in a unit test file for one of the utils methods, testing a happy path and some malformed arguments.
- RWD supports small and large screen sizes. On mobile, sender and receiver addresses are fully expanded and layout collapses into a column, while on large res address are truncated with an option to preview the whole address on hover and the layout expands horiznotally.
- Components are split into smaller, managable, testable chunks. Something along the lines of Atomic principles.
- a page, `Dashboard`, manages data as well as handles events from inputs before feeding the transformed data into display components. No routing present, since there was no owhere to navigate to, but this `page` naming tries to reflect NextJS structure.
- the main part of functionality is in a context file. This acts a global state management. Since there is only one page, this context is global. However, in a bigger app each specific context hugs top-level component in it's domain, since not everything has to available globally. Using custom hooks give an elegant way to access and interact with the data. Alternatively, `useReducer` hook could be explored in a bigger platform, bringing in a Redux-like approach.
- any events listeners get added/removed to fetch data depending on user's filtering queries.
- methods likely used in various places have been extracted into global `utils`, as well as any global consts, such as base request url.
