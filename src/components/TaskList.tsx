import React from 'react';
import { Task } from '../types/task.types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onEdit?: (id: string, updates: Partial<Task>) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
  isLoading?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  isLoading = false,
}): JSX.Element => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit ? (updates) => onEdit(task.id, updates) : undefined}
          onDelete={onDelete ? () => onDelete(task.id) : undefined}
          onStatusChange={onStatusChange ? (status) => onStatusChange(task.id, status) : undefined}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
