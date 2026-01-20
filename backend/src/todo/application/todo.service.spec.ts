import { Test } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TODO_REPOSITORY } from '../infrastructure/todo.tokens';
import { TodoStatus } from '../domain/todo.status';
import { TodoRepository } from '../domain/todo.repository';

describe('TodoService', () => {
  let service: TodoService;

  const repoMock: jest.Mocked<TodoRepository> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: TODO_REPOSITORY, useValue: repoMock },
      ],
    }).compile();

    service = moduleRef.get(TodoService);
  });

  it('findAll passes status filter to repository', async () => {
    repoMock.findAll.mockResolvedValueOnce([]);

    await service.findAll(TodoStatus.DONE);

    expect(repoMock.findAll).toHaveBeenCalledWith(TodoStatus.DONE);
  });

  it('create defaults status to PENDING when not provided', async () => {
    repoMock.create.mockResolvedValueOnce({
      id: 'id',
      title: 't',
      description: null,
      status: TodoStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const created = await service.create({ title: 't' });

    expect(repoMock.create).toHaveBeenCalledWith(
      expect.objectContaining({ status: TodoStatus.PENDING }),
    );
    expect(created.status).toBe(TodoStatus.PENDING);
  });
});
