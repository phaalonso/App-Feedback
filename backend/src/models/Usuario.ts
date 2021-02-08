import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Postagem from "./Postagem";

@Entity('usuario')
export default class Usuario {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'nome', type:'varchar', nullable: false })
    nome: string;

    @Column({ name: 'email', type:'varchar', nullable: false, unique: true })
    email: string;

    @Column({ name: 'senha', type:'varchar', nullable: false, select: false })
    senha: string;

    @OneToMany(() => Postagem, post => post.usuario)
    postagens: Postagem[];

}