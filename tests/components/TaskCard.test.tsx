import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from '../src/components/TaskCard';
import { Task } from '../src/types/task.types';

describe('TaskCard Component', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test description',
    status: 'pending',
    priority: 'high',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should render task card with title', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('should render priority badge', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('should render status badge', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('should call onEdit when Edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<TaskCard task={mockTask} onEdit={onEdit} />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });

  it('should call onDelete when Delete button is clicked', () => {
    const onDelete = jest.fn();
    render(<TaskCard task={mockTask} onDelete={onDelete} />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith(mockTask.id);
  });
});
