# Task Management Backend

Express.js + SQLite API backend for the Task Management application.

## Features

- ✅ RESTful API for task CRUD operations
- ✅ SQLite database with Sequelize ORM (no installation needed!)
- ✅ TypeScript for type safety
- ✅ CORS enabled for frontend integration
- ✅ Error handling middleware
- ✅ Environment configuration
- ✅ File-based database (portable, version-control friendly)

## Prerequisites

- Node.js 18+
- npm 9+
- ~~PostgreSQL~~ (NOT NEEDED - uses SQLite!)

## Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your database credentials:**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=task_management
   DB_USER=postgres
   DB_PASSWORD=your_password
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

## Database Setup

### SQLite (Automatic!)

SQLite is automatically set up when you start the backend. The database file `tasks.sqlite` will be created in the backend root directory.

**No installation or configuration needed!** ✨

### Verify Database Creation

After running the server, check that `tasks.sqlite` file exists:
```bash
ls -la tasks.sqlite
```

## Running the Server

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production mode** (requires build):
```bash
npm run build
npm start
```

Server will start on port 5000 (configurable via `.env`)

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (with filtering/sorting) |
| GET | `/api/tasks/:id` | Get single task by ID |
| GET | `/api/tasks/status/:status` | Get tasks by status |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/health` | Health check |

### Example Requests

**Create Task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "high",
    "status": "pending",
    "dueDate": "2024-12-31",
    "tags": ["shopping"]
  }'
```

**Get All Tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Update Task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_FILEPATH` | ./tasks.sqlite | SQLite database file path |
| `PORT` | 5000 | Server port |
| `NODE_ENV` | development | Environment mode |
| `FRONTEND_URL` | http://localhost:5173 | Frontend URL for CORS |

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── env.ts          # Environment configuration
│   │   └── database.ts     # Database connection
│   ├── models/
│   │   └── Task.ts         # Task model & schema
│   ├── routes/
│   │   └── tasks.ts        # Task API routes
│   ├── middleware/
│   │   └── cors.ts         # CORS & error handling
│   └── server.ts           # Express app setup
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Troubleshooting

### Port Already in Use
- Change `PORT` in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9` (macOS/Linux)

### Database File Issues
- Delete `tasks.sqlite` to reset database
- File will be automatically recreated on next server start

### Dependencies Issues
- Clear cache: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

## License

MIT
