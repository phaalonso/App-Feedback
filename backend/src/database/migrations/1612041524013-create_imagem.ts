import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImagem1612041524013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'image',
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
                    name: 'path',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'postagem_id',
                    type: 'integer',
                    unsigned: true
                }
            ],
            foreignKeys: [
                {
                    name: 'postagem_id_fk',
                    columnNames: ["postagem_id"],
                    referencedTableName: 'postagem',
                    referencedColumnNames: ['id'],
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('image')
    }

}
