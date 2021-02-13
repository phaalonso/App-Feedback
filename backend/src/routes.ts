import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/uploadConfig";
import PostagemController from "./controllers/PostagemController";
import UsuarioController from "./controllers/UsuarioController";
import authentication from './middleware/authenticate';

const router = Router();
const upload = multer(uploadConfig);

router.get('/user', UsuarioController.index);
router.get('/user/:id', UsuarioController.show);
router.post('/user', UsuarioController.create);

router.get('/postagem', PostagemController.index);
router.get('/postagem/:id', PostagemController.show);
router.delete('/postagem/:id', PostagemController.delete);
router.post('/postagem', upload.array('imagens'), PostagemController.create);

router.post('/login', UsuarioController.login);

router.post('/aprovar/:id', authentication.validate, PostagemController.aprovarAviso);

export default router;
