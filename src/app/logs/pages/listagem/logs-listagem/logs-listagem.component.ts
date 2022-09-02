import { Component, OnInit } from '@angular/core';
import { LogResponse } from 'src/app/logs/models/responses/log.response';
import { LogsService } from 'src/app/logs/services/logs.service';
import { Breadcrumb } from 'src/app/shared/breadcrumb/models/breadcrumb';
import { datePipe } from 'src/app/shared/pipes/date-pipe';

@Component({
  selector: 'app-logs-listagem',
  templateUrl: './logs-listagem.component.html',
  styleUrls: ['./logs-listagem.component.css']
})
export class LogsListagemComponent implements OnInit {

  public bradcrumb: Breadcrumb;
  public logsResponse: Array<LogResponse>;
  public columns: Array<{}>;
  public loadingIndicator = true;
  public reorderable = true;
  public existeLogs: boolean;
  public descricaoLogFiltro: string;
  public exibirTextoFiltro: boolean;

  constructor(
    private readonly logsService: LogsService
  ) { }

  ngOnInit(): void {
    this.existeLogs = false;

    this.bradcrumb = new Breadcrumb({
      tituloPagina: 'Logs',
      paths: [{nome: '/home', link: '/', ativo: true}, {nome: '/logs', link: '/logs', ativo: false}]
    });

    this.recuperarLogs();
    this.configColumns()
  }

  public async recuperarLogs(): Promise<void> {
    this.logsResponse = await this.logsService.recuperar();
    this.loadingIndicator = false;
    this.validarQuantidadeMercado();
  }

  private configColumns() {
    this.columns = [
      { prop: 'Data', name: 'Data', width: 110, pipe: new datePipe() },
      { prop: 'Tipo', name: 'Tipo', width: 60},
      { prop: 'Descricao', name: 'Descrição', width: 300},
      { prop: 'Stack', name: 'Stack', width: 300}
    ];
  }

  public atualizarLogsResponse(logsResponses: Array<LogResponse>) {
    this.logsResponse = logsResponses;
    this.validarQuantidadeMercado();
  }

  private validarQuantidadeMercado() {
    if(this.logsResponse.length > 0) {
      this.existeLogs = false
    }else {
      this.existeLogs = true
    }
  }

  public atualizarTextoFiltro(textoFiltro: string) {
    this.descricaoLogFiltro = textoFiltro;
    this.exibirTextoFiltro = true;
  }

}
