import React, { useState } from 'react';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { Task } from '../types/task.types';
import { useFetchTasks } from '../hooks/useFetchTasks';
import { useCreateTask } from '../hooks/useCreateTask';
import { useUpdateTask } from '../hooks/useUpdateTask';
import { useDeleteTask } from '../hooks/useDeleteTask';

export const TasksPage: React.FC = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'status'>('priority');

  const { tasks, loading, error, refetch } = useFetchTasks();
  const { createTask, loading: creating } = useCreateTask();
  const { updateTask, loading: updating } = useUpdateTask();
  const { deleteTask, loading: deleting } = useDeleteTask();

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      await createTask(taskData);
      await refetch();
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create task:', err);
      throw err;
    }
  };

  const handleUpdateTask = async (id: string, updates: Partial<Task>): Promise<void> => {
    try {
      await updateTask(id, updates);
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (id: string): Promise<void> => {
    try {
      await deleteTask(id);
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority': {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      case 'dueDate':
        return new Date(a.dueDate || Date.now()).getTime() - new Date(b.dueDate || Date.now()).getTime();
      case 'status': {
        const statusOrder = { pending: 0, 'in-progress': 1, completed: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      default:
        return 0;
    }
  });

  return (
    <div className="page tasks-page">
      <div className="page-header">
        <h1>My Tasks</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
          disabled={creating}
        >
          {showForm ? '✕ Close' : '+ New Task'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>Create New Task</h2>
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="controls-section">
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.currentTarget.value as any)}>
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="sort-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.currentTarget.value as any)}>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <div className="content-section">
        {error && (
          <div className="alert alert-error">
            Error loading tasks: {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading tasks...</p>
          </div>
        )}

        {!loading && sortedTasks.length === 0 && (
          <div className="empty-state">
            <p>No tasks yet. Create one to get started!</p>
          </div>
        )}

        {!loading && sortedTasks.length > 0 && (
          <>
            <div className="task-stats">
              <div className="stat">
                <span className="label">Total:</span>
                <span className="value">{tasks.length}</span>
              </div>
              <div className="stat">
                <span className="label">Completed:</span>
                <span className="value">{tasks.filter(t => t.status === 'completed').length}</span>
              </div>
              <div className="stat">
                <span className="label">In Progress:</span>
                <span className="value">{tasks.filter(t => t.status === 'in-progress').length}</span>
              </div>
            </div>
            <TaskList
              tasks={sortedTasks}
              onEdit={handleUpdateTask}
              onDelete={handleDeleteTask}
              onStatusChange={(id, status) => handleUpdateTask(id, { status })}
              isLoading={updating || deleting}
            />
          </>
        )}
      </div>
    </div>
  );
};
