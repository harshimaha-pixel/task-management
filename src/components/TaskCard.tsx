import React from 'react';
import { Task } from '../types/task.types';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}): JSX.Element => {
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return '#ff6b6b';
      case 'medium':
        return '#ffa500';
      case 'low':
        return '#51cf66';
      default:
        return '#999';
    }
  };

  return (
    <div className="task-card" style={{ borderLeftColor: getPriorityColor(task.priority) }}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-meta">
        <span className={`status-badge status-${task.status}`}>{task.status}</span>
        {task.dueDate && (
          <span className="task-due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="task-actions">
        {onStatusChange && (
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.currentTarget.value as Task['status'])}
            className="status-select"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        )}
        {onEdit && <button onClick={() => onEdit(task)}>Edit</button>}
        {onDelete && <button onClick={() => onDelete(task.id)}>Delete</button>}
      </div>
    </div>
  );
};
