import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MercadoResponse } from 'src/app/mercados/models/responses/mercado.response';
import { MercadoService } from 'src/app/mercados/services/mercado.service';
import { CONSULTA_MERCADO_FORMULARIO_COFNG } from './config/mercado-formulario.config';

@Component({
  selector: 'app-consulta-mercado',
  templateUrl: './consulta-mercado.component.html',
  styleUrls: ['./consulta-mercado.component.css']
})
export class ConsultaMercadoComponent implements OnInit {
  public formulario: FormGroup;
  public mercadosResponse: Array<MercadoResponse>

  @Output() onEnviarMercadosResponse: EventEmitter<Array<MercadoResponse>> = new EventEmitter<Array<MercadoResponse>>();
  @Output() onPesquisarTodos: EventEmitter<void> = new EventEmitter<void>();
  @Output() onTextoFiltro: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private readonly mercadoService: MercadoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.mercadosResponse = new Array<MercadoResponse>();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(CONSULTA_MERCADO_FORMULARIO_COFNG);
  }

  public async consultarMercados() {
    try {
      this.spinner.show();
      const nomeMercado = this.formulario.get('Nome')?.value
      if(nomeMercado == "") {
        this.onPesquisarTodos.emit()
        return
      }
      this.mercadosResponse = await this.mercadoService.recuperarPorNome(nomeMercado)
      this.onEnviarMercadosResponse.emit(this.mercadosResponse);
      this.onTextoFiltro.emit(nomeMercado);
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.toast.error('Falha ao buscar mercados', 'Falha')
    }
  }

}
