# React Development Guide

## Project Overview

This is a React + TypeScript application built with Vite. **React and TypeScript are mandatory for all development on this project.**

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## Development Commands

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Lint code
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type check with TypeScript
npm run type-check
```

## Project Architecture

### Directory Structure

```
src/
├── components/          # Reusable React components
│   ├── common/         # Common UI components
│   ├── TaskCard.tsx    # Task display component
│   ├── TaskForm.tsx    # Task creation/edit form
│   └── TaskList.tsx    # List container
├── hooks/              # Custom React hooks
│   ├── useTasks.ts     # Task state management
│   └── useFetch.ts     # Data fetching hook
├── pages/              # Page-level components
│   ├── HomePage.tsx
│   └── TasksPage.tsx
├── types/              # TypeScript type definitions
│   └── task.types.ts
├── services/           # API and business logic
│   └── api.ts         # HTTP client
├── utils/              # Utility functions
│   ├── validators.ts
│   └── date-utils.ts
├── App.tsx            # Root component
└── main.tsx           # Vite entry point
```

## Creating Components

### Component Template

All components MUST use TypeScript (.tsx) and have explicit types:

```typescript
// src/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  count?: number;
  onAction: (id: string) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  count = 0,
  onAction,
}): JSX.Element => {
  const handleClick = (): void => {
    onAction('123');
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Action</button>
    </div>
  );
};
```

### Component Best Practices

1. **Always define props interface**
   ```typescript
   interface ComponentProps {
     title: string;
     onSubmit: (data: any) => void;
   }
   ```

2. **Always add return type annotation**
   ```typescript
   export const Component: React.FC<Props> = (): JSX.Element => {
     // ...
   };
   ```

3. **Use functional components with hooks**
   - Avoid class components
   - Use `useState`, `useEffect`, `useCallback`, etc.

4. **Extract complex logic into hooks**
   ```typescript
   // Custom hook
   const useMyLogic = () => {
     const [state, setState] = useState('initial');
     // ...
     return { state, doSomething };
   };

   // Use in component
   const { state, doSomething } = useMyLogic();
   ```

## Working with TypeScript

### Type Definitions

Create a `types` directory for shared types:

```typescript
// src/types/task.types.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStatus = Task['status'];
export type TaskPriority = Task['priority'];
```

### Strict Mode

The project has TypeScript strict mode enabled:
- `noImplicitAny`: true
- `strictNullChecks`: true
- `strictFunctionTypes`: true
- `noUnusedLocals`: true
- `noUnusedParameters`: true

Always provide explicit types to avoid `any`.

## API Integration

### Using the API Client

```typescript
import apiClient from '../services/api';
import { Task } from '../types/task.types';

// Fetch data
const response = await apiClient.get<Task[]>('/tasks');

// Create data
const newTask = await apiClient.post<Task>('/tasks', {
  title: 'New Task',
  description: 'Description',
});

// Update data
await apiClient.put<Task>(`/tasks/${id}`, updatedData);

// Delete data
await apiClient.delete(`/tasks/${id}`);
```

### Custom Hooks for Data Fetching

```typescript
// src/hooks/useFetchTasks.ts
import { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { Task } from '../types/task.types';

export const useFetchTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      try {
        const response = await apiClient.get<{ data: Task[] }>('/tasks');
        setTasks(response.data.data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading, error };
};
```

## State Management

### Local State with useState

```typescript
const [tasks, setTasks] = useState<Task[]>([]);
```

### Custom Hooks for Shared State

```typescript
const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const addTask = useCallback((task: Task): void => {
    setTasks(prev => [...prev, task]);
  }, []);
  
  return { tasks, addTask };
};
```

### Context API for Global State

```typescript
// Create context
const TaskContext = React.createContext<any>(null);

// Provider component
export const TaskProvider: React.FC<Props> = ({ children }): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// Use in components
const { tasks } = useContext(TaskContext);
```

## Testing

### Testing Library Setup

All tests use React Testing Library and Jest.

### Unit Testing a Hook

```typescript
import { renderHook, act } from '@testing-library/react';
import { useTasks } from '../src/hooks/useTasks';

describe('useTasks', () => {
  it('should add a task', () => {
    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.addTask(mockTask);
    });
    
    expect(result.current.tasks).toHaveLength(1);
  });
});
```

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from '../src/components/TaskForm';

describe('TaskForm', () => {
  it('should submit form data', async () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Title'), 'My Task');
    await userEvent.click(screen.getByText('Submit'));
    
    expect(onSubmit).toHaveBeenCalled();
  });
});
```

## Environment Variables

Variables must be prefixed with `VITE_` to be accessible in the React app:

```typescript
// In your component or service
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.VITE_DEBUG === 'true';
```

### Defining New Env Variables

1. Add to `.env.development.local`:
   ```env
   VITE_MY_VAR=value
   ```

2. Add type definition to `src/vite-env.d.ts`:
   ```typescript
   interface ImportMetaEnv {
     readonly VITE_MY_VAR: string;
   }
   ```

3. Use in code:
   ```typescript
   const myVar = import.meta.env.VITE_MY_VAR;
   ```

## Performance Optimization

### Code Splitting

```typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export const App = (): JSX.Element => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeavyComponent />
  </Suspense>
);
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

// Memoize components
export const ExpensiveComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

// Memoize computations
const expensiveValue = useMemo(
  () => complexCalculation(data),
  [data]
);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);
```

## Debugging

### React DevTools

Install the React DevTools browser extension to:
- Inspect component props and state
- Track component re-renders
- Profile component performance
- Step through code

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///./src/*": "${webspaceFolder}/src/*"
      }
    }
  ]
}
```

## Common Pitfalls

1. **Missing Type Annotations**
   - ❌ `const handleClick = () => {}`
   - ✅ `const handleClick = (): void => {}`

2. **Forgetting Dependencies in useEffect**
   - ❌ `useEffect(() => { fetch(url); }, [])`
   - ✅ `useEffect(() => { fetch(url); }, [url])`

3. **Creating Objects in JSX**
   - ❌ `<Component config={{ setting: true }} />`
   - ✅ `const config = { setting: true }; <Component config={config} />`

4. **Not Handling Async Errors**
   - ❌ `const data = await fetch(url);`
   - ✅ `try { const data = await fetch(url); } catch (err) { /* handle */ }`

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)

## Questions?

Refer to `.copilot-instructions` for the complete development guidelines.
