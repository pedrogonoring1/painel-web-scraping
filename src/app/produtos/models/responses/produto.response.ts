export class ProdutoResponse {
  _id: string;
  Nome: string;
  LinkImage: string;
  IdProdutoMercadoMenorValor: string;

  constructor(params: Partial<ProdutoResponse>) {
    this._id = params._id!;
    this.Nome = params.Nome!;
    this.LinkImage = params.LinkImage!;
    this.IdProdutoMercadoMenorValor = params.IdProdutoMercadoMenorValor!;
  }
}
