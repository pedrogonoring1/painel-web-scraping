import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { ProdutoRequest } from "../models/requests/produto.request";
import { ProdutoResponse } from "../models/responses/produto.response";

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  private urlBase = environment.urlApi;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  constructor(private httpClient: HttpClient) {}

  public recuperar(): Promise<Array<ProdutoResponse>> {
    return this.httpClient.get<Array<ProdutoResponse>>(`${this.urlBase}produto`, this.httpOptions).toPromise()
  }

  public criar(produtoRequest: ProdutoRequest): Promise<Array<ProdutoResponse>> {
    return this.httpClient.post<Array<ProdutoResponse>>(`${this.urlBase}produto`, produtoRequest, this.httpOptions).toPromise()
  }

  public excluir(produtoResponse: ProdutoResponse): Promise<void> {
    return this.httpClient.delete<void>(`${this.urlBase}produto/${produtoResponse._id}`, this.httpOptions).toPromise();
  }

  public editar(produtoResponse: ProdutoResponse): Promise<void> {
    return this.httpClient.put<void>(`${this.urlBase}produto/${produtoResponse._id}`, produtoResponse, this.httpOptions).toPromise();
  }

  public recuperarPorNome(nomeProduto: string): Promise<Array<ProdutoResponse>> {
    return this.httpClient.get<Array<ProdutoResponse>>(`${this.urlBase}produto/recuperar-nome/${nomeProduto}`, this.httpOptions).toPromise();
  }
}
