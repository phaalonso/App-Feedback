import {MigrationInterface, QueryRunner} from "typeorm";

export class postagemEnum1612963277318 implements MigrationInterface {
    name = 'postagemEnum1612963277318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `postagem` ADD `tipo` enum ('0', '1', '2') NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `postagem` DROP COLUMN `tipo`");
    }
}
