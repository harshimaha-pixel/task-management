import React, { useState } from 'react';
import { Task } from '../types/task.types';

interface TaskItemProps {
  task: Task;
  onEdit?: (updates: Partial<Task>) => void;
  onDelete?: () => void;
  onStatusChange?: (status: Task['status']) => void;
  isLoading?: boolean;
}

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

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return '#51cf66';
    case 'in-progress':
      return '#4c6ef5';
    case 'pending':
      return '#ced4da';
    default:
      return '#999';
  }
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  isLoading = false,
}): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleStatusChange = (): void => {
    if (onStatusChange) {
      onStatusChange(editedStatus);
    }
    setIsEditing(false);
  };

  const isCompleted = task.status === 'completed';

  return (
    <div
      className={`task-item ${isCompleted ? 'completed' : ''}`}
      style={{ borderLeftColor: getPriorityColor(task.priority) }}
    >
      <div className="task-item-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="task-item-title-section">
          <button className="expand-button">
            {isExpanded ? '▼' : '▶'}
          </button>
          <div className="task-item-title">
            <h3 className={isCompleted ? 'line-through' : ''}>{task.title}</h3>
            <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
              {task.priority}
            </span>
          </div>
        </div>

        <span className="status-badge" style={{ backgroundColor: getStatusColor(task.status) }}>
          {task.status}
        </span>
      </div>

      {isExpanded && (
        <div className="task-item-content">
          {task.description && (
            <div className="task-description">
              <strong>Description:</strong>
              <p>{task.description}</p>
            </div>
          )}

          {task.dueDate && (
            <div className="task-due-date">
              <strong>Due Date:</strong>
              <p>{new Date(task.dueDate).toLocaleDateString()} {new Date(task.dueDate).toLocaleTimeString()}</p>
            </div>
          )}

          {task.tags && task.tags.length > 0 && (
            <div className="task-tags">
              <strong>Tags:</strong>
              <div className="tags">
                {task.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="task-item-meta">
            <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
            <small>Updated: {new Date(task.updatedAt).toLocaleDateString()}</small>
          </div>

          <div className="task-item-actions">
            {isEditing ? (
              <div className="status-editor">
                <select
                  value={editedStatus}
                  onChange={(e) => setEditedStatus(e.currentTarget.value as Task['status'])}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button onClick={handleStatusChange} disabled={isLoading}>
                  Save
                </button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <>
                {onStatusChange && (
                  <button onClick={() => setIsEditing(true)}>Change Status</button>
                )}
                {onDelete && (
                  <button onClick={onDelete} className="btn-danger" disabled={isLoading}>
                    Delete
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
