import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { TodoStatus } from '../../domain/todo.status';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;
}
