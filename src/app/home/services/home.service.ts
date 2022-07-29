import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.prod";
import { JobResponse } from "../models/responses/job";

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  private urlBase = environment.urlApi;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  constructor(private httpClient: HttpClient, private router: Router) {}

  public recuperarStatusJob() {
    return this.httpClient.get<Array<JobResponse>>(`${this.urlBase}job`, this.httpOptions).toPromise()
  }

  public alterarStatusJob(): Promise<void>{
    return this.httpClient.post<void>(`${this.urlBase}job/alterar-status`, this.httpOptions).toPromise()
  }
}
