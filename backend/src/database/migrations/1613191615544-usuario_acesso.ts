import {MigrationInterface, QueryRunner} from "typeorm";

export class usuarioAcesso1613191615544 implements MigrationInterface {
    name = 'usuarioAcesso1613191615544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` ADD `acessoLevel` enum ('0', '1') NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` DROP COLUMN `acessoLevel`");
    }

}
