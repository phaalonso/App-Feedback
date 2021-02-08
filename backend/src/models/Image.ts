import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Postagem from "./Postagem";

@Entity('image')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type:'varchar', nullable: false })
    path: string;

    @ManyToOne(() => Postagem, post => post.images)
    @JoinColumn({ name: 'postagem_id' })
    post: Postagem;
}