import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPost1612041131218 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'postagem',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'mensagem',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'usuario_id',
                    type: 'integer',
                    unsigned: true
                }
            ],
            foreignKeys: [
                {
                    name: "usuario_id_fk",
                    columnNames: ["usuario_id"],
                    referencedTableName: "postagem",
                    referencedColumnNames: ["id"],
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('postagem');
    }

}
