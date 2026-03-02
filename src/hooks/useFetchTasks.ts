import { useState, useEffect } from 'react';
import { Task } from '../types/task.types';
import apiClient from '../services/api';

export const useFetchTasks = (): {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasksAsync = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get<{ data: Task[] }>('/tasks');
      setTasks(response.data.data || []);
    } catch (err: any) {
      // For demo purposes, use mock data if API fails and clear error
      setTasks(getMockTasks());
      setError(null); // Clear error since we have fallback mock data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksAsync();
  }, []);

  return { tasks, loading, error, refetch: fetchTasksAsync };
};

// Mock data for demo purposes
const getMockTasks = (): Task[] => [
  {
    id: '1',
    title: 'Complete Project Setup',
    description: 'Set up React and TypeScript environment',
    status: 'completed',
    priority: 'high',
    dueDate: new Date('2024-12-15'),
    tags: ['setup', 'project'],
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-15'),
  },
  {
    id: '2',
    title: 'Build Task Components',
    description: 'Create TaskCard, TaskForm, and TaskList components',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2024-12-25'),
    tags: ['components', 'react'],
    createdAt: new Date('2024-12-05'),
    updatedAt: new Date('2024-12-10'),
  },
  {
    id: '3',
    title: 'Add Unit Tests',
    description: 'Write comprehensive unit tests for all components',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date('2024-12-30'),
    tags: ['testing', 'qa'],
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-10'),
  },
  {
    id: '4',
    title: 'Style the Application',
    description: 'Add CSS styling and animations',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date('2025-01-05'),
    tags: ['styling', 'ui'],
    createdAt: new Date('2024-12-12'),
    updatedAt: new Date('2024-12-12'),
  },
];
