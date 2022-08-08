import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProdutoListagemResponse } from 'src/app/produtos-mercados/models/responses/produto-listagem.response';
import { ProdutoMercadoService } from 'src/app/produtos-mercados/services/services/produto-mercado.service';
import { CONSULTA_PRODUTO_MERCADO_FORMULARIO_COFNG } from './config/consulta-produto-mercado-formulario.config';

@Component({
  selector: 'app-consulta-produto-mercado',
  templateUrl: './consulta-produto-mercado.component.html',
  styleUrls: ['./consulta-produto-mercado.component.css']
})
export class ConsultaProdutoMercadoComponent implements OnInit {
  public formulario: FormGroup;
  public produtoMercadosResponse: Array<ProdutoListagemResponse>

  @Output() onEnviarProdutosMercadosResponse: EventEmitter<Array<ProdutoListagemResponse>> = new EventEmitter<Array<ProdutoListagemResponse>>();
  @Output() onPesquisarTodos: EventEmitter<void> = new EventEmitter<void>();
  @Output() onTextoFiltro: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private readonly produtoMercadoService: ProdutoMercadoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.produtoMercadosResponse = new Array<ProdutoListagemResponse>();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(CONSULTA_PRODUTO_MERCADO_FORMULARIO_COFNG);
  }

  public async consultarMercados() {
    try {
      this.spinner.show();
      const nomeMercado = this.formulario.get('Nome')?.value
      if(nomeMercado == "") {
        this.onPesquisarTodos.emit()
        this.spinner.hide()
        return
      }
      this.produtoMercadosResponse = await this.produtoMercadoService.recuperarPorNome(nomeMercado)
      this.onEnviarProdutosMercadosResponse.emit(this.produtoMercadosResponse);
      this.onTextoFiltro.emit(nomeMercado);
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.toast.error('Falha ao buscar produto mercados', 'Falha')
    }
  }
}
