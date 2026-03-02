# src/ Directory - React Components and Services

This directory contains all the React frontend code for the Task Management application.

## Structure

- **App.tsx** - Root React component
- **main.tsx** - Vite entry point (replaces index.ts)
- **index.css** - Global styles
- **vite-env.d.ts** - Vite environment type definitions
- **components/** - Reusable React components
- **hooks/** - Custom React hooks
- **pages/** - Page-level components (for routing)
- **services/** - API clients and business logic
- **types/** - TypeScript type definitions
- **utils/** - Utility functions

## Note

The old `index.ts` file has been replaced by `main.tsx` as the entry point for this React + Vite application. The application is now a frontend-only project. If you need a backend, set it up as a separate service and configure the API URL in environment variables.

## Getting Started

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Open http://localhost:5173 in your browser

## Documentation

- See [REACT_DEVELOPMENT.md](../docs/REACT_DEVELOPMENT.md) for comprehensive React development guide
- See [.copilot-instructions](../.copilot-instructions) for code standards and guidelines
