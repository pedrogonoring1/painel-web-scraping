import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { ProdutoMercadoRequest } from "../../models/requests/produto-mercado.request";
import { ProdutoListagemResponse } from "../../models/responses/produto-listagem.response";
import { ProdutoMercadoResponse } from "../../models/responses/produto-mercado.response";


@Injectable({
  providedIn: 'root'
})

export class ProdutoMercadoService {
  private urlBase = environment.urlApi;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  constructor(private httpClient: HttpClient) {}

  public recuperar(): Promise<Array<ProdutoMercadoResponse>> {
    return this.httpClient.get<Array<ProdutoMercadoResponse>>(`${this.urlBase}produto-mercado`, this.httpOptions).toPromise()
  }

  public recuperarProdutoListagem(): Promise<Array<ProdutoListagemResponse>> {
    return this.httpClient.get<Array<ProdutoListagemResponse>>(`${this.urlBase}produto-mercado/produto-listagem`, this.httpOptions).toPromise()
  }

  public criar(produtoRequest: ProdutoMercadoRequest): Promise<Array<ProdutoMercadoResponse>> {
    return this.httpClient.post<Array<ProdutoMercadoResponse>>(`${this.urlBase}produto-mercado`, produtoRequest, this.httpOptions).toPromise()
  }

  public excluir(produtoResponse: ProdutoMercadoResponse): Promise<void> {
    return this.httpClient.delete<void>(`${this.urlBase}produto-mercado/${produtoResponse._id}`, this.httpOptions).toPromise();
  }

  public editar(produtoResponse: ProdutoMercadoResponse): Promise<void> {
    return this.httpClient.put<void>(`${this.urlBase}produto-mercado/${produtoResponse._id}`, produtoResponse, this.httpOptions).toPromise();
  }

  public recuperarPorNome(nomeProduto: string): Promise<Array<ProdutoMercadoResponse>> {
    return this.httpClient.get<Array<ProdutoMercadoResponse>>(`${this.urlBase}produto-mercado/recuperar-nome/${nomeProduto}`, this.httpOptions).toPromise();
  }
}
