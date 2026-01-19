import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTodos1768830868557 implements MigrationInterface {
  name = 'CreateTodos1768830868557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE todos (
        id char(36) NOT NULL,
        title varchar(255) NOT NULL,
        description text NULL,
        status enum('PENDING','IN_PROGRESS','DONE') NOT NULL DEFAULT 'PENDING',
        createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE todos;`);
  }
}
