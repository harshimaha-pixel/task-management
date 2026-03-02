import { renderHook, act } from '@testing-library/react';
import { useTasks } from '../src/hooks/useTasks';
import { Task } from '../src/types/task.types';

describe('useTasks Hook', () => {
  it('should initialize with empty tasks', () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual([]);
  });

  it('should add a task', () => {
    const { result } = renderHook(() => useTasks());
    const newTask: Task = {
      id: '1',
      title: 'Test Task',
      description: 'Test description',
      status: 'pending',
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    act(() => {
      result.current.addTask(newTask);
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]).toEqual(newTask);
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useTasks());
    const newTask: Task = {
      id: '1',
      title: 'Test Task',
      description: 'Test description',
      status: 'pending',
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    act(() => {
      result.current.addTask(newTask);
    });

    act(() => {
      result.current.deleteTask('1');
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  it('should update a task', () => {
    const { result } = renderHook(() => useTasks());
    const newTask: Task = {
      id: '1',
      title: 'Test Task',
      description: 'Test description',
      status: 'pending',
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    act(() => {
      result.current.addTask(newTask);
    });

    act(() => {
      result.current.updateTask('1', { status: 'completed' });
    });

    expect(result.current.tasks[0].status).toBe('completed');
  });

  it('should clear all tasks', () => {
    const { result } = renderHook(() => useTasks());
    const newTask: Task = {
      id: '1',
      title: 'Test Task',
      description: 'Test description',
      status: 'pending',
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    act(() => {
      result.current.addTask(newTask);
    });

    act(() => {
      result.current.clearTasks();
    });

    expect(result.current.tasks).toHaveLength(0);
  });
});
