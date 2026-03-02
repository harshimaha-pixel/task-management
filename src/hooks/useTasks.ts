import { useState, useCallback } from 'react';
import { Task } from '../types/task.types';

export const useTasks = (): {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  clearTasks: () => void;
} => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((task: Task): void => {
    setTasks((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>): void => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  const deleteTask = useCallback((id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const clearTasks = useCallback((): void => {
    setTasks([]);
  }, []);

  return { tasks, addTask, updateTask, deleteTask, clearTasks };
};
