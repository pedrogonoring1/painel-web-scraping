import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LogResponse } from 'src/app/logs/models/responses/log.response';
import { LogsService } from 'src/app/logs/services/logs.service';
import { CONSULTA_LOGS_FORMULARIO_COFNG } from './config/consulta-produto-mercado-formulario.config';

@Component({
  selector: 'app-consulta-logs',
  templateUrl: './consulta-logs.component.html',
  styleUrls: ['./consulta-logs.component.css']
})
export class ConsultaLogsComponent implements OnInit {

  public formulario: FormGroup;
  public logsResponse: Array<LogResponse>

  @Output() onEnviarLogsResponse: EventEmitter<Array<LogResponse>> = new EventEmitter<Array<LogResponse>>();
  @Output() onPesquisarTodos: EventEmitter<void> = new EventEmitter<void>();
  @Output() onTextoFiltro: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private readonly logsServiceService: LogsService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.logsResponse = new Array<LogResponse>();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(CONSULTA_LOGS_FORMULARIO_COFNG);
  }

  public async consultarLogs() {
    try {
      this.spinner.show();
      const descricaoLog = this.formulario.get('Descricao')?.value
      if(descricaoLog == "") {
        this.onPesquisarTodos.emit()
        this.spinner.hide()
        return
      }
      this.logsResponse = await this.logsServiceService.recuperarPorDescricao(descricaoLog)
      this.onEnviarLogsResponse.emit(this.logsResponse);
      this.onTextoFiltro.emit(descricaoLog);
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.toast.error('Falha ao buscar logs', 'Falha')
    }
  }

}
