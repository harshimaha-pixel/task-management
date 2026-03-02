# Task Management Application

A modern, interactive task management application built with React, TypeScript, and Vite.

## Features

- ✅ Create, read, update, and delete tasks
- 📊 Task prioritization and categorization
- 🔄 Task status tracking
- 🏷️ Tags and labels support
- 📅 Due date management
- 🔐 User authentication
- ⚡ Real-time UI updates
- 🎨 Modern, responsive design

## Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Language**: TypeScript (mandatory)
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint with React rules
- **Formatting**: Prettier
- **Package Manager**: npm

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-management
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.development.local
```

4. Configure environment variables in `.env.development.local`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Task Management
VITE_DEBUG=true
```

## Development

Start the development server with hot reload:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Watch mode for development:
```bash
npm run test:watch
```

## Code Quality

Run linter:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

Format code:
```bash
npm run format
```

Type checking:
```bash
npm run type-check
```

## Project Structure

```
task-management/
├── src/
│   ├── components/     # Reusable React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── services/       # API and business logic
│   ├── types/          # TypeScript types and interfaces
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── tests/              # Test files
├── public/             # Static assets
├── .env.example        # Environment variables template
├── .env.development.local  # Development environment (git ignored)
├── .env.production.local   # Production environment (git ignored)
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── jest.config.js      # Jest configuration
├── .eslintrc.json      # ESLint configuration
├── .prettierrc          # Prettier configuration
├── package.json        # Project dependencies
└── README.md           # This file
```

## Component Examples

### Creating a Simple Component

```typescript
// src/components/TaskCard.tsx
import React from 'react';
import { Task } from '../types/task.types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }): JSX.Element => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className={`priority-${task.priority}`}>{task.priority}</span>
      <div className="actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};
```

### Creating a Custom Hook

```typescript
// src/hooks/useTasks.ts
import { useState, useCallback } from 'react';
import { Task } from '../types/task.types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((task: Task): void => {
    setTasks((prev) => [...prev, task]);
  }, []);

  const deleteTask = useCallback((id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return { tasks, addTask, deleteTask };
};
```

## Environment Variables

The project uses Vite's environment system. Variables must be prefixed with `VITE_` to be accessible in the app:

```typescript
// In your code
const apiUrl = import.meta.env.VITE_API_URL;
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Code Standards

- **Language**: TypeScript (mandatory)
- **Framework**: React (mandatory)
- **Naming**: PascalCase for components, camelCase for functions/hooks
- **Components**: Must be .tsx files with explicit return types
- **Props**: Must be typed with TypeScript interfaces
- **Testing**: All new features must have tests

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, open an issue on GitHub or contact the development team.

## Changelog

### Version 1.0.0
- Initial release with React and TypeScript
- Core task management features
- Modern UI with Vite
