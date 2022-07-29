export class ProdutoMercadoRequest {
  Valor: number;
  Link: string;
  IdProduto: string;
  IdMercado: string;

  constructor(params: Partial<ProdutoMercadoRequest>) {
    this.Valor = params.Valor!;
    this.Link = params.Link!;
    this.IdProduto = params.IdProduto!;
    this.IdMercado = params.IdMercado!;
  }
}
