import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Postagem from "../models/Postagem";
import postagemView from "../view/postagemView";

export default {
    async index(req: Request, res: Response) {
        const postagemRepository = getRepository(Postagem);

        const postagems = await postagemRepository.find();
        console.log(postagems);
        

        return res.json(postagemView.renderMany(postagems));
    },
    async show(req: Request, res: Response) {
        const postagemRepository = getRepository(Postagem);
        const { id } = req.params;

        const postagem = await postagemRepository.findOne(id);

        if (postagem) {
            return res.json(postagemView.render(postagem));
        } else {
            return res.status(204).send();
        }
    },
    async create(req: Request, res: Response) {
        const postagemRepository = getRepository(Postagem);
        const { mensagem, usuario } = req.body;

        const requestImagens = req.files as Express.Multer.File[];

        const imagens = requestImagens.map(img => ({ path: img.filename }));
        console.log(imagens);
        

        const post = postagemRepository.create({
            mensagem,
            usuario: { id: usuario },
            images: imagens
        })

        await postagemRepository.save(post);

        return res.status(201).json(post);
    }
}