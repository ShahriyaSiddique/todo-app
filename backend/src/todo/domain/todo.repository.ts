import { Todo } from './todo.model';
import { TodoStatus } from './todo.status';

export interface TodoRepository {
  create(todo: Partial<Todo>): Promise<Todo>;
  findAll(status?: TodoStatus): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  update(id: string, data: Partial<Todo>): Promise<Todo>;
  delete(id: string): Promise<void>;
}
