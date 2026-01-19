import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './application/todo.service';
import { TodoEntity } from './infrastructure/todo.entity';
import { TODO_REPOSITORY } from './infrastructure/todo.tokens';
import { TypeOrmTodoRepository } from './infrastructure/typeorm-todo.repository';
import { TodoController } from './presentation/todo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [
    TodoService,
    TypeOrmTodoRepository,
    { provide: TODO_REPOSITORY, useExisting: TypeOrmTodoRepository },
  ],
})
export class TodoModule {}
