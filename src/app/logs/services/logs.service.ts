import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { LogResponse } from "../models/responses/log.response";


@Injectable({
  providedIn: 'root'
})

export class LogsService {
  private urlBase = environment.urlApi;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  constructor(private httpClient: HttpClient) {}

  public async recuperar(): Promise<Array<LogResponse>> {
    return await this.httpClient.get<Array<LogResponse>>(`${this.urlBase}logs`, this.httpOptions).toPromise()
  }

  public async recuperarPorDescricao(nomeProduto: string): Promise<Array<LogResponse>> {
    return await this.httpClient.get<Array<LogResponse>>(`${this.urlBase}logs/recuperar-descricao/${nomeProduto}`, this.httpOptions).toPromise();
  }
}
