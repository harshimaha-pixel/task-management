// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateTaskTitle = (title: string): string | null => {
  if (!title || title.trim().length === 0) {
    return 'Title is required';
  }
  if (title.length < 3) {
    return 'Title must be at least 3 characters';
  }
  if (title.length > 200) {
    return 'Title must not exceed 200 characters';
  }
  return null;
};

export const validateTaskDescription = (description: string): string | null => {
  if (description && description.length > 2000) {
    return 'Description must not exceed 2000 characters';
  }
  return null;
};

export const validateDueDate = (date: Date): string | null => {
  if (date && new Date(date) < new Date()) {
    return 'Due date cannot be in the past';
  }
  return null;
};

export const validateTaskData = (taskData: any): string[] => {
  const errors: string[] = [];

  const titleError = validateTaskTitle(taskData.title);
  if (titleError) errors.push(titleError);

  const descriptionError = validateTaskDescription(taskData.description);
  if (descriptionError) errors.push(descriptionError);

  if (taskData.dueDate) {
    const dueDateError = validateDueDate(taskData.dueDate);
    if (dueDateError) errors.push(dueDateError);
  }

  if (!taskData.priority || !['low', 'medium', 'high'].includes(taskData.priority)) {
    errors.push('Invalid priority level');
  }

  if (!taskData.status || !['pending', 'in-progress', 'completed'].includes(taskData.status)) {
    errors.push('Invalid status');
  }

  return errors;
};

export const isValidTask = (taskData: any): boolean => {
  return validateTaskData(taskData).length === 0;
};
