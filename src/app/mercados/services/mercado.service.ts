import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.prod";
import { MercadoRequest } from "../models/requests/mercado.request";
import { MercadoResponse } from "../models/responses/mercado.response";

@Injectable({
  providedIn: 'root'
})

export class MercadoService {
  private urlBase = environment.urlApi;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  constructor(private httpClient: HttpClient, private router: Router) {}

  public recuperar(): Promise<Array<MercadoResponse>> {
    return this.httpClient.get<Array<MercadoResponse>>(`${this.urlBase}mercado`, this.httpOptions).toPromise()
  }

  public criar(mercadoResquest: MercadoRequest): Promise<Array<MercadoResponse>> {
    return this.httpClient.post<Array<MercadoResponse>>(`${this.urlBase}mercado`, mercadoResquest, this.httpOptions).toPromise()
  }

  public excluir(mercadoResponse: MercadoResponse): Promise<string> {
    return this.httpClient.delete<string>(`${this.urlBase}mercado/${mercadoResponse._id}`, this.httpOptions).toPromise();
  }

  public editar(mercadoResponse: MercadoResponse): Promise<void> {
    return this.httpClient.put<void>(`${this.urlBase}mercado/${mercadoResponse._id}`, mercadoResponse, this.httpOptions).toPromise();
  }

  public recuperarPorNome(nomeMercado: string): Promise<Array<MercadoResponse>> {
    return this.httpClient.get<Array<MercadoResponse>>(`${this.urlBase}mercado/recuperar-nome/${nomeMercado}`, this.httpOptions).toPromise();
  }
}
