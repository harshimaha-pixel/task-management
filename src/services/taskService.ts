import apiClient from './api';
import { Task } from '../types/task.types';

export const taskService = {
  // Fetch all tasks
  fetchTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<{ data: Task[] }>('/tasks');
    return response.data.data || [];
  },

  // Fetch single task
  fetchTask: async (id: string): Promise<Task> => {
    const response = await apiClient.get<{ data: Task }>(`/tasks/${id}`);
    return response.data.data;
  },

  // Create task
  createTask: async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const response = await apiClient.post<{ data: Task }>('/tasks', taskData);
    return response.data.data;
  },

  // Update task
  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await apiClient.put<{ data: Task }>(`/tasks/${id}`, updates);
    return response.data.data;
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },

  // Get tasks by status
  getTasksByStatus: async (status: Task['status']): Promise<Task[]> => {
    const response = await apiClient.get<{ data: Task[] }>('/tasks', {
      params: { status },
    });
    return response.data.data || [];
  },

  // Get tasks by priority
  getTasksByPriority: async (priority: Task['priority']): Promise<Task[]> => {
    const response = await apiClient.get<{ data: Task[] }>('/tasks', {
      params: { priority },
    });
    return response.data.data || [];
  },

  // Search tasks
  searchTasks: async (query: string): Promise<Task[]> => {
    const response = await apiClient.get<{ data: Task[] }>('/tasks/search', {
      params: { q: query },
    });
    return response.data.data || [];
  },
};
