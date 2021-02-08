import Postagem from "../models/Postagem";
import imagemView from "./imagemView";

export default {
    render(post: Postagem) {
        return {
            id: post.id,
            mensagem: post.mensagem,
            images: imagemView.renderMany(post.images)
        }
    },
    renderMany(post: Postagem[]) {
        console.log(post);
        
        return post.map(post => this.render(post));
    }
}