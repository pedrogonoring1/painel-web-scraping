export class ProdutoListagemResponse {
  NomeProduto: number;
  NomeMercado: string;
  Valor: number;
  LinkImage: string;
  IdProduto: string;
  IdMercado: string;

  constructor(params: Partial<ProdutoListagemResponse>) {
    this.NomeProduto = params.NomeProduto!;
    this.NomeMercado = params.NomeMercado!;
    this.Valor = params.Valor!;
    this.LinkImage = params.LinkImage!;
    this.IdProduto = params.IdProduto!;
    this.IdMercado = params.IdMercado!;
  }
}
