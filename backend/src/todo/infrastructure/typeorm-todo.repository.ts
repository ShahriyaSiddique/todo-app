import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoRepository } from '../domain/todo.repository';
import { TodoStatus } from '../domain/todo.status';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TypeOrmTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly repo: Repository<TodoEntity>,
  ) {}

  async create(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    const entity = this.repo.create({
      title: todo.title?.trim(),
      description: todo.description ?? null,
      status: todo.status ?? TodoStatus.PENDING,
    });
    return this.repo.save(entity);
  }

  async findAll(status?: TodoStatus): Promise<TodoEntity[]> {
    if (!status) return this.repo.find({ order: { createdAt: 'DESC' } });
    return this.repo.find({ where: { status }, order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<TodoEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<TodoEntity>): Promise<TodoEntity> {
    const existing = await this.findById(id);
    if (!existing) throw new NotFoundException('Todo not found');

    if (typeof data.title === 'string') existing.title = data.title.trim();
    if (data.description !== undefined)
      existing.description = data.description ?? null;
    if (data.status) existing.status = data.status;

    return this.repo.save(existing);
  }

  async delete(id: string): Promise<void> {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Todo not found');
  }
}
