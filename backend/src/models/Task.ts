import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface TaskAttributes {
  id?: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
  public id!: string;
  public title!: string;
  public description!: string;
  public status!: 'pending' | 'in-progress' | 'completed';
  public priority!: 'low' | 'medium' | 'high';
  public dueDate!: Date;
  public tags!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [3, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending',
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
  }
);

export default Task;
