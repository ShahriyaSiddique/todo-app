import { TodoStatus } from './todo.status';

export interface Todo {
  id: string;
  title: string;
  description?: string | null;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}
