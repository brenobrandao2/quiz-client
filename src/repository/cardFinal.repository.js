export class CardFinal {
    constructor(_id, titulo, subtitulo, botao, imagem) {
        this._id = _id
        this.titulo = titulo || ''
        this.subtitulo = subtitulo || ''
        this.botao = botao || ''
        this.imagem = imagem
    }
}