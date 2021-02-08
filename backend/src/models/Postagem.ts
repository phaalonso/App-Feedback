import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Image from "./Image";
import Usuario from "./Usuario";

@Entity('postagem')
export default class Postagem {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'mensagem', type: 'varchar', nullable: false })
    mensagem: string;

    @ManyToOne(() => Usuario, usuario => usuario.postagens)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @OneToMany(() => Image, img => img.post, {
        cascade: ['insert', 'update', 'remove'],
        eager: true
    })
    images: Image[];

}