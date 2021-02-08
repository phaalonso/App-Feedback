import Image from "../models/Image";

export default {
    render(img: Image) {
        return {
            id: img.id,
            url: `http://localhost:3333/uploads/${img.path}`
        }
    },
    renderMany(imgs: Image[]) {
        return imgs.map(img => this.render(img));
    }
}