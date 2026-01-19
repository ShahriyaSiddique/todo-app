import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { TodoService } from '../application/todo.service';
import { CreateTodoDto } from '../application/dto/create-todo.dto';
import { UpdateTodoDto } from '../application/dto/update-todo.dto';
import { TodoStatus } from '../domain/todo.status';

@Controller('todos')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('status') status?: TodoStatus) {
    return this.service.findAll(status);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
