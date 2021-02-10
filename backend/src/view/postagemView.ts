import Postagem from "../models/Postagem";
import imagemView from "./imagemView";

export default {
    render(post: Postagem) {
        return {
            id: post.id,
            titulo: post.titulo,
            mensagem: post.mensagem,
			images: imagemView.renderMany(post.images),
			tipo: post.tipo,
			aprovada: post.aprovada
        }
    },
    renderMany(post: Postagem[]) {
        return post.map(post => this.render(post));
    }
}
