import { Request, Response } from "express";
import { FindManyOptions, getRepository } from "typeorm";
import Postagem from "../models/Postagem";
import postagemView from "../view/postagemView";
import * as Yup from 'yup';

export default {
    async index(req: Request, res: Response) {
		const { tipo, aprovada } = req.query;

		let options: FindManyOptions<Postagem> = {};
		options.where = {};

		/**
		 * Se a variável tipo exisistir, ele irá adicionar as opçẽos de busca
		 * um where para retornar apenas os atributos que o satisfaçam
		 */
		if (tipo) {
			const schema = Yup.object().shape({
				tipo: Yup.number().required().integer().min(0).max(2)
			});

			await schema.validate({ tipo }, {
				abortEarly: false
			});

			options.where.tipo = tipo;
		}

		if (aprovada) {
			const schema2 = Yup.object().shape({
				autorizada: Yup.boolean().required()
			});

			await schema2.validate({ autorizada: aprovada }, {
				abortEarly: false
			});

			options.where.aprovada = aprovada === 'true' ? true : false;
		}

        const postagemRepository = getRepository(Postagem);

		console.log(options);
        const postagems = await postagemRepository.find(options);
        

        return res.json(postagemView.renderMany(postagems));
    },
    async show(req: Request, res: Response) {
        const postagemRepository = getRepository(Postagem);
        const { id } = req.params;

		const schema = Yup.object().shape({
			id: Yup.number().required().integer().min(0)
		});

		await schema.validate({ id }, {
			abortEarly: false
		});

        const postagem = await postagemRepository.findOne(id);

        if (postagem) {
            return res.json(postagemView.render(postagem));
        } else {
            return res.status(204).send();
        }
    },
    async create(req: Request, res: Response) {
        const postagemRepository = getRepository(Postagem);
		const { mensagem, usuario: usuario_id, tipo } = req.body;

		const data = { 
			mensagem, 
			usuario: {
				id: usuario_id
			},
			tipo
		};

		const schema = Yup.object().shape({
			mensagem: Yup.string().trim().required(),
			usuario: Yup.object().shape({
				id: Yup.number().required().integer().min(0)
			}),
			tipo: Yup.number().required().integer().min(0).max(2)
		});

		await schema.validate(data, {
			abortEarly: false
		});

        const requestImagens = req.files as Express.Multer.File[];

        const imagens = requestImagens.map(img => ({ path: img.filename }));
        console.log(imagens);
        
        const post = postagemRepository.create(data)

        await postagemRepository.save(post);

        return res.status(201).json(post);
	},

	async aprovarAviso(req: Request, res: Response) {
        const postagemRepository = getRepository(Postagem);
        const { id } = req.params;

		const { aprovada } = req.body;

		const schema = Yup.object().shape({
			id: Yup.number().required().integer().min(0)
		});

		await schema.validate({ id }, {
			abortEarly: false,
		});

		const bodySchema = Yup.object().shape({ 
			aprovada: Yup.bool().required()
		});

		await bodySchema.validate({ aprovada }, {
			abortEarly: false
		});

		const result = await postagemRepository.update(id, { aprovada })

		if (result.affected && result.affected > 0) {
			return res.json({ message: 'Atualizada' });
		}

		return res.status(400).send();
	}
}
