# Project Files Overview

This document provides a complete guide to all files in the Task Management project.

## 📋 Configuration Files

### TypeScript
- **`tsconfig.json`**
  - Strict mode enabled (all strict checks)
  - JSX set to "react-jsx"
  - ESNext modules
  - Advanced inference enabled

- **`tsconfig.node.json`**
  - Configuration for `vite.config.ts`
  - Composite project setup

### Build & Development
- **`vite.config.ts`**
  - React plugin configured
  - Dev server on port 5173
  - Build output to dist/

- **`jest.config.js`**
  - ts-jest preset
  - jsdom environment for React testing
  - CSS mock configuration

### Code Quality
- **`.eslintrc.json`**
  - React plugin enabled
  - React Hooks rules enforced
  - TypeScript rules applied
  - Strict type checking

- **`.prettierrc`**
  - Single quotes
  - 2-space indentation
  - Semicolons required
  - Trailing commas (es5)

### Git
- **`.gitignore`**
  - node_modules/
  - dist/ build output
  - .env files (secrets)
  - IDE directories
  - OS-specific files

### Environment
- **`.env.example`**
  - Template for environment variables
  - Documents VITE_* prefix requirement

- **`.env.development.local`**
  - Development environment settings
  - API URL configuration

## 📄 Documentation Files

### Main Documentation
- **`README.md`**
  - Project overview
  - Installation instructions
  - Available commands
  - Project structure
  - Component examples
  - Contributing guidelines

- **`.copilot-instructions`**
  - Complete development standards (MANDATORY)
  - Code style and conventions
  - Architecture principles
  - React best practices
  - Testing guidelines
  - Common tasks and patterns

### Developer Guides
- **`docs/SETUP_COMPLETE.md`**
  - Setup completion summary
  - Next steps
  - Key files to review
  - Development standards
  - Tips & tricks

- **`docs/REACT_DEVELOPMENT.md`**
  - Comprehensive React development guide
  - Component creation patterns
  - TypeScript best practices
  - API integration
  - State management approaches
  - Testing examples
  - Performance optimization
  - Debugging techniques
  - Common pitfalls

- **`docs/MIGRATION.md`**
  - Architecture migration notes
  - Old to new file mapping
  - Project evolution overview

- **`src/README.md`**
  - Source directory structure
  - Getting started instructions

## 📦 Package & License
- **`package.json`**
  - Project metadata
  - Dependencies (React, Axios)
  - Dev dependencies (Vite, Jest, ESLint, etc.)
  - NPM scripts
  - Node.js version requirement (18+)

- **`LICENSE`**
  - MIT License

## 🌐 Web Entry Point
- **`index.html`**
  - Root HTML file
  - Mounts React app to `<div id="root">`
  - Loads `src/main.tsx`
  - Sets viewport and charset

## 🔧 Source Code Structure

### Entry Points
- **`src/main.tsx`**
  - Application entry point
  - Renders React app to DOM
  - Imports styles

- **`src/App.tsx`**
  - Root React component
  - Main application layout
  - Welcome screen with features overview

### Styling
- **`src/index.css`**
  - Global styles
  - CSS variables
  - Responsive design utilities
  - Dark mode support

### Type Definitions
- **`src/vite-env.d.ts`**
  - Vite environment variable types
  - Defines VITE_* prefix variables
  - Type checking for import.meta.env

- **`src/types/task.types.ts`**
  - Task interface definition
  - Task-related type exports
  - Task status and priority types

### Services
- **`src/services/api.ts`**
  - Axios HTTP client instance
  - Request/response interceptors
  - Authentication token handling
  - Base URL configuration

### Components
- **`src/components/TaskCard.tsx`**
  - Task display component
  - Props interface with TypeScript
  - Priority color coding
  - Status badge rendering
  - Inline actions

- **`src/components/TaskForm.tsx`**
  - Task creation/editing form
  - Form validation
  - Error handling
  - TypeScript typed props
  - Controlled components pattern

### Hooks
- **`src/hooks/useTasks.ts`**
  - Custom state management hook
  - Add/update/delete/clear tasks
  - useCallback for memoization
  - Explicit return type typing

## 🧪 Test Files

### Setup
- **`tests/setup.ts`**
  - Jest configuration
  - Testing Library matchers
  - Window.matchMedia mock

### Hook Tests
- **`tests/hooks/useTasks.test.ts`**
  - useTasks hook testing
  - renderHook usage
  - act() for state updates
  - Comprehensive test coverage

### Component Tests
- **`tests/components/TaskCard.test.tsx`**
  - TaskCard rendering tests
  - Props validation
  - User interaction testing
  - Callback function verification

- **`tests/components/TaskForm.test.tsx`**
  - Form submission testing
  - Validation testing
  - Error message display
  - User event handling

## 🗂️ Directory Structure Summary

```
task-management/
├── Configuration Files
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── jest.config.js
│   ├── .eslintrc.json
│   └── .prettierrc
│
├── Environment Files
│   ├── .env.example
│   └── .env.development.local
│
├── Documentation
│   ├── README.md
│   ├── .copilot-instructions
│   ├── LICENSE
│   └── docs/
│       ├── SETUP_COMPLETE.md
│       ├── REACT_DEVELOPMENT.md
│       ├── MIGRATION.md
│       └── FILES_OVERVIEW.md (this file)
│
├── Web Entry
│   └── index.html
│
├── Source Code
│   └── src/
│       ├── main.tsx          # Entry point
│       ├── App.tsx           # Root component
│       ├── index.css         # Styles
│       ├── vite-env.d.ts     # Env types
│       ├── components/       # React components
│       ├── hooks/            # Custom hooks
│       ├── services/         # API client
│       ├── types/            # TypeScript types
│       ├── utils/            # Helpers
│       ├── pages/            # Page components
│       ├── README.md         # Src directory info
│       └── (old index.ts removed)
│
├── Tests
│   ├── setup.ts
│   ├── hooks/
│   │   └── useTasks.test.ts
│   └── components/
│       ├── TaskCard.test.tsx
│       └── TaskForm.test.tsx
│
├── Git
│   └── .gitignore
│
└── Package
    └── package.json
```

## Mandatory React + TypeScript Files

These files MUST be in TypeScript (.ts or .tsx):
- ✅ All component files (`.tsx`)
- ✅ All hook files (`.ts`)
- ✅ All service files (`.ts`)
- ✅ All type files (`.ts`)
- ✅ All test files (`.ts` or `.tsx`)
- ✅ `vite.config.ts`

## Key Development Files

**Most Important:**
1. `.copilot-instructions` - Read this first
2. `README.md` - Project overview
3. `src/App.tsx` - Component example
4. `docs/REACT_DEVELOPMENT.md` - Detailed guide

**Reference Examples:**
1. `src/components/TaskCard.tsx` - Simple component
2. `src/components/TaskForm.tsx` - Complex component
3. `src/hooks/useTasks.ts` - Custom hook
4. `src/services/api.ts` - API client
5. `tests/components/TaskForm.test.tsx` - Testing pattern

## Notes

- All configuration is based on React + TypeScript best practices
- All code examples follow strict TypeScript standards
- All tests use React Testing Library for component testing
- CSS uses modern features with responsive design
- Project requires Node.js 18+

## Version Information

- React: 18.2.0+
- TypeScript: 5.3.3+
- Vite: 5.0.8+
- Node.js: 18+ (required)

---

**This project enforces React and TypeScript as mandatory technologies. All new code must follow these standards.**
