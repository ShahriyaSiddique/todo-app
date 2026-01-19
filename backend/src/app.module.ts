import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get<string>('DB_HOST'),
        port: Number(cfg.get<string>('DB_PORT')),
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASSWORD'),
        database: cfg.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, // IMPORTANT: migrations handle schema
        logging: false,
      }),
    }),
    TodoModule,
  ],
})
export class AppModule {}
