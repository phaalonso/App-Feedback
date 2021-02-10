import Postagem from "../models/Postagem";
import imagemView from "./imagemView";

export default {
    render(post: Postagem) {
        return {
            id: post.id,
            mensagem: post.mensagem,
			images: imagemView.renderMany(post.images),
			tipo: post.tipo,
			aprovada: post.aprovada
        }
    },
    renderMany(post: Postagem[]) {
        console.log(post);
        
        return post.map(post => this.render(post));
    }
}
