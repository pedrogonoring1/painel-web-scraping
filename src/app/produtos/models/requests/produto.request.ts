export class ProdutoRequest {
  Nome: string;
  LinkImage: string;
  IdProdutoMercadoMenorValor: string;

  constructor(params: Partial<ProdutoRequest>) {
    this.Nome = params.Nome!;
    this.LinkImage = params.LinkImage!;
    this.IdProdutoMercadoMenorValor = params.IdProdutoMercadoMenorValor!;
  }
}
