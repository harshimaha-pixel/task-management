// Date utility functions
export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString();
};

export const formatDateTime = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleString();
};

export const formatDateShort = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return date.toLocaleDateString();
};

export const getDaysUntilDue = (date: Date | string): number => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date = new Date(date);
  date.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isOverdue = (date: Date | string): boolean => {
  return getDaysUntilDue(date) < 0;
};

export const isDueSoon = (date: Date | string): boolean => {
  const daysUntilDue = getDaysUntilDue(date);
  return daysUntilDue >= 0 && daysUntilDue <= 3;
};

export const isToday = (date: Date | string): boolean => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isTomorrow = (date: Date | string): boolean => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.toDateString() === tomorrow.toDateString();
};
