import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class postagemAprovada1612974924871 implements MigrationInterface {
    name = 'postagemAprovada1612974924871'

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('postagem', new TableColumn({
			name: 'aprovada',
			type: 'bool',
			default: false
		}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('postagem', 'aprovada')
    }

}
