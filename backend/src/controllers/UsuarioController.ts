import { Request, Response } from 'express';
import { getRepository } from "typeorm"
import Usuario from "../models/Usuario"
import * as jwt from 'jsonwebtoken';
import * as Yup from 'yup';

const MYSQL_UNIQUE_CONSTRAINT_VIOLATION = 1062;

export default {
    async index(req: Request, res: Response) {
        const userRepository = getRepository(Usuario);

        const usuarios = await userRepository.find();

        return res.json(usuarios);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

		const schema = Yup.object().shape({
			id: Yup.number().required().integer().min(0)
		});

		await schema.validate({ id }, {
			abortEarly: false
		});

        const userRepository = getRepository(Usuario);

        const usuario = await userRepository.findOne(id);

        if (usuario)
            return res.json(usuario);
        else
            return res.status(204).send();
    },

    async create(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

		const data = { 
			nome, 
			email,
			senha
		};

		const schema = Yup.object().shape({
			nome: Yup.string().trim().required(),
			email: Yup.string().trim().required().email(),
			senha: Yup.string().trim().required()
		});

		await schema.validate(data, {
			abortEarly: false
		})

        const userRepository = getRepository(Usuario);

        const user = userRepository.create(data);

        try {
            await userRepository.save(user);
    
            return res.status(201).json(user);
        } catch (err) {
            if (err && err.errno == MYSQL_UNIQUE_CONSTRAINT_VIOLATION) {
                return res.status(409).json({ message: 'Este email já está cadastrado' });
            }
            console.error(err);
        }

	},
	async login(request: Request, response: Response) {
		//desestruturacao
		const { email, senha } = request.body;

		const data = {
			email,
			senha
		};

		const schema = Yup.object().shape({
			email: Yup.string().required().email(),
			senha: Yup.string().required()
		});

		await schema.validate(data, {
			abortEarly: true
		});

		const userRepository = getRepository(Usuario);

		const user = await userRepository.findOneOrFail({ where: data });

		const token = jwt.sign({ id: user.id }, process.env.TOKEN_ACESSO as jwt.Secret, {
			expiresIn: 300, // expires in 5min
		});

		return response.status(200).json({
			token: token,
		});
  }
}
