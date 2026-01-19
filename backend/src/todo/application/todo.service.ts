import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TODO_REPOSITORY } from '../infrastructure/todo.tokens';
import { TodoRepository } from '../domain/todo.repository';
import { TodoStatus } from '../domain/todo.status';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todos: TodoRepository,
  ) {}

  create(dto: CreateTodoDto) {
    return this.todos.create({
      title: dto.title,
      description: dto.description,
      status: dto.status ?? TodoStatus.PENDING,
    });
  }

  findAll(status?: TodoStatus) {
    return this.todos.findAll(status);
  }

  async findById(id: string) {
    const todo = await this.todos.findById(id);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  update(id: string, dto: UpdateTodoDto) {
    return this.todos.update(id, dto);
  }

  delete(id: string) {
    return this.todos.delete(id);
  }
}
