import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/uploadConfig";
import PostagemController from "./controllers/PostagemController";
import UsuarioController from "./controllers/UsuarioController";

const router = Router();
const upload = multer(uploadConfig);

router.get('/user', UsuarioController.index);
router.get('/user/:id', UsuarioController.show);
router.post('/user', UsuarioController.create);

router.get('/postagem', PostagemController.index);
router.get('/postagem/:id', PostagemController.show);
router.post('/postagem', upload.array('imagens'), PostagemController.create);

router.post('/aprovar/:id', PostagemController.aprovarAviso);

export default router;
