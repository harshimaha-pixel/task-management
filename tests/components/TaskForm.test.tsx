import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from '../src/components/TaskForm';

describe('TaskForm Component', () => {
  it('should render form with input fields', () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText('Task Title *')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
  });

  it('should show error when title is empty', async () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    const submitButton = screen.getByText('Create Task');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });
  });

  it('should call onSubmit with form data', async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    render(<TaskForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Task Title *'), 'My Task');
    await user.type(screen.getByLabelText('Description'), 'My Description');

    await user.click(screen.getByText('Create Task'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'My Task',
          description: 'My Description',
        })
      );
    });
  });

  it('should call onCancel when Cancel button is clicked', () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();
    render(<TaskForm onSubmit={onSubmit} onCancel={onCancel} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });
});
