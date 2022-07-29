export class ProdutoMercadoResponse {
  _id: string;
  Valor: number;
  Link: string;
  IdProduto: string;
  IdMercado: string;

  constructor(params: Partial<ProdutoMercadoResponse>) {
    this._id = params._id!;
    this.Valor = params.Valor!;
    this.Link = params.Link!;
    this.IdProduto = params.IdProduto!;
    this.IdMercado = params.IdMercado!;
  }
}
