import { useState } from 'react';
import { Task } from '../types/task.types';
import apiClient from '../services/api';

export const useUpdateTask = (): {
  updateTask: (id: string, updates: Partial<Task>) => Promise<Task>;
  loading: boolean;
  error: string | null;
} => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.put<{ data: Task }>(`/tasks/${id}`, updates);
      return response.data.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update task';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateTask, loading, error };
};
