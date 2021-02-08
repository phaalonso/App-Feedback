import { Request, Response } from 'express';
import { getRepository, QueryFailedError } from "typeorm"
import Usuario from "../models/Usuario"

const MYSQL_UNIQUE_CONSTRAINT_VIOLATION = 1062;

export default {

    async index(req: Request, res: Response) {
        const userRepository = getRepository(Usuario);

        const usuarios = await userRepository.find();

        return res.json(usuarios);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const userRepository = getRepository(Usuario);

        const usuario = await userRepository.findOne(id);

        if (usuario)
            return res.json(usuario);
        else
            return res.status(204).send();
    },

    async create(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        const userRepository = getRepository(Usuario);

        const user = userRepository.create({
            nome,
            email,
            senha
        });

        try {
            await userRepository.save(user);
    
            return res.status(201).json(user);
        } catch (err) {
            if (err && err.errno == MYSQL_UNIQUE_CONSTRAINT_VIOLATION) {
                return res.status(409).json({ message: 'Este email já está cadastrado' });
            }
            console.error(err);
        }

    }

    // async delete(req: Request, res: Response) {

    // }
}