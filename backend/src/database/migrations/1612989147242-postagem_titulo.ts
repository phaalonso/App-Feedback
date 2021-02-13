import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class postagemTitulo1612989147242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('postagem', new TableColumn({
        name: 'titulo', 
        type: 'varchar',
        isNullable: false
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('postagem', 'titulo');
    }

}
