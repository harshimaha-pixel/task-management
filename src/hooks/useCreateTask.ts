import { useState } from 'react';
import { Task } from '../types/task.types';
import apiClient from '../services/api';

export const useCreateTask = (): {
  createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Task>;
  loading: boolean;
  error: string | null;
} => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    try {
      setLoading(true);
      setError(null);
      console.log('Creating task with data:', taskData);
      const response = await apiClient.post<{ data: Task }>('/tasks', taskData);
      console.log('Task created successfully:', response.data.data);
      return response.data.data;
    } catch (err: any) {
      console.error('Task creation error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to create task';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createTask, loading, error };
};
