import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { TodoEntity } from '../todo/infrastructure/todo.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [TodoEntity],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: false,
});
