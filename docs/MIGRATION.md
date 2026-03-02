# How to update the previous old index.ts to the React setup

If you had an old Express backend (index.ts), you'll need to:

1. **Delete or backup** the old `src/index.ts` file
2. **Keep** the new `src/main.tsx` as the entry point
3. **Update your backend** to run on a separate port (e.g., 3000)
4. **Update** `.env.development.local` to point to your backend:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

## Project Evolution

This project has transitioned from:
- **Before**: Node.js/Express backend API
- **After**: React/TypeScript frontend application

If you still need a backend, consider:
- Running it as a separate service
- Creating a `/server` directory with separate backend code
- Using Node.js in production to serve the React build AND API routes

## Getting Started with React

1. Run `npm install` to install dependencies
2. Update `.env.development.local` with your API endpoint
3. Run `npm run dev` to start the dev server
4. Open http://localhost:5173 in your browser
5. Start building React components!

## File Migration Notes

Old files that were replaced:
- `src/index.ts` → `src/main.tsx` (entry point)
- NA (API files) → `src/services/api.ts` (API client)
- NA (types) → `src/types/task.types.ts` (TypeScript types)

New files specific to React:
- `index.html` - HTML entry point
- `vite.config.ts` - Vite build configuration
- `src/App.tsx` - Root React component
- `src/components/` - Reusable components
- `src/hooks/` - Custom React hooks
- `src/pages/` - Page-level components
