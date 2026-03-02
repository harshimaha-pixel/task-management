import express, { Router, Request, Response } from 'express';
import Task from '../models/Task';

const router: Router = express.Router();

// GET all tasks with optional filtering and sorting
router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, priority, sort } = req.query;

    // Build where clause for filtering
    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }
    if (priority) {
      where.priority = priority;
    }

    // Build order clause for sorting
    const order: any[] = [];
    if (sort === 'dueDate') {
      order.push(['dueDate', 'ASC']);
    } else if (sort === 'priority') {
      order.push([['priority', 'DESC']]);
    } else {
      order.push(['createdAt', 'DESC']);
    }

    const tasks = await Task.findAll({
      where,
      order: order.length > 0 ? order : [['createdAt', 'DESC']],
    });

    res.json({ data: tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET single task by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ data: task });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// POST - Create a new task
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate, tags } = req.body;

    // Validate required fields
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ error: 'Title is required and must be at least 3 characters' });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || undefined,
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : (null as any),
      tags: tags || [],
    });

    res.status(201).json({ data: task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT - Update a task
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate, tags } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update allowed fields
    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim() || undefined;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) {
      task.dueDate = dueDate ? new Date(dueDate) : (null as any);
    }
    if (tags !== undefined) task.tags = tags;

    await task.save();
    res.json({ data: task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE - Delete a task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted successfully', data: task });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// GET tasks by status
router.get('/status/:status', async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const tasks = await Task.findAll({ where: { status } });
    res.json({ data: tasks });
  } catch (error) {
    console.error('Error fetching tasks by status:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

export default router;
