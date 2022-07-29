import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProdutoResponse } from 'src/app/produtos/models/responses/produto.response';
import { ProdutoService } from 'src/app/produtos/services/produto.service';
import { CONSULTA_PRODUTO_FORMULARIO_COFNG } from './config/produto-formulario.config';

@Component({
  selector: 'app-consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.css']
})
export class ConsultaProdutoComponent implements OnInit {

  public formulario: FormGroup;
  public produtoResponse: Array<ProdutoResponse>

  @Output() onEnviarMercadosResponse: EventEmitter<Array<ProdutoResponse>> = new EventEmitter<Array<ProdutoResponse>>();
  @Output() onPesquisarTodos: EventEmitter<void> = new EventEmitter<void>();
  @Output() onTextoFiltro: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private readonly produtoService: ProdutoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.produtoResponse = new Array<ProdutoResponse>();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(CONSULTA_PRODUTO_FORMULARIO_COFNG);
  }

  public async consultarProdutos() {
    try {
      this.spinner.show();
      const nomeProduto = this.formulario.get('Nome')?.value
      if(nomeProduto == "") {
        this.onPesquisarTodos.emit()
        return
      }
      this.produtoResponse = await this.produtoService.recuperarPorNome(nomeProduto)
      this.onEnviarMercadosResponse.emit(this.produtoResponse);
      this.onTextoFiltro.emit(nomeProduto);
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.toast.error('Falha ao buscar mercados', 'Falha')
    }
  }

}
