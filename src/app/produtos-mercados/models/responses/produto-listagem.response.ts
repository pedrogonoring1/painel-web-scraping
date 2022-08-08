import { MercadoResponse } from "./mercado.response";
import { ProdutoResponse } from "./produto.response";

export class ProdutoListagemResponse {
  _id: string;
  Valor: number;
  Link: string;
  Produto: ProdutoResponse;
  Mercado: MercadoResponse;

  constructor(params: Partial<ProdutoListagemResponse>) {
    this._id = params._id!;
    this.Valor = params.Valor!;
    this.Link = params.Link!;
    this.Produto = params.Produto!;
    this.Mercado = params.Mercado!;
  }
}
