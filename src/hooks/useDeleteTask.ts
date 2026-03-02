import { useState } from 'react';
import apiClient from '../services/api';

export const useDeleteTask = (): {
  deleteTask: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
} => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTask = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.delete(`/tasks/${id}`);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete task';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { deleteTask, loading, error };
};
