import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProdutoResponse } from 'src/app/produtos/models/responses/produto.response';
import { ProdutoService } from 'src/app/produtos/services/produto.service';

@Component({
  selector: 'app-produto-listagem',
  templateUrl: './produto-listagem.component.html',
  styleUrls: ['./produto-listagem.component.css']
})
export class ProdutoListagemComponent implements OnInit {

  public produtos: Array<ProdutoResponse>;
  public existeProduto: boolean;
  public nomeProdutoFiltro: string;
  public exibirTextoFiltro: boolean;

  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.produtos = new Array<ProdutoResponse>();
    this.existeProduto = false;
    this.recuperarProdutos();
    this.nomeProdutoFiltro = "";
    this.exibirTextoFiltro = false;
  }

  public async recuperarProdutos() {
    try {
      this.spinner.show()
      this.produtos = await this.produtoService.recuperar();
      this.validarQuantidadeProduto();
      this.spinner.hide()

    } catch (error) {
      this.spinner.hide()
      this.toastr.error('Falha ao recuperar mercados', 'Erro')
    }
  }

  public async excluirMercado(produtoResponse: ProdutoResponse) {
    try {
      this.spinner.show()
      await this.produtoService.excluir(produtoResponse);
      await this.recuperarProdutos()
      this.spinner.hide()
      this.toastr.success('Mercado Excluído', 'Sucesso')
    } catch (error) {
      this.spinner.hide()
      this.toastr.error('Falha ao excluir', 'Falha')
    }
  }

  public atualizarMercadosResponse(produtosResponses: Array<ProdutoResponse>) {
    this.produtos = produtosResponses;
    this.validarQuantidadeProduto();
  }

  public atualizarTextoFiltro(textoFiltro: string) {
    this.nomeProdutoFiltro = textoFiltro;
    this.exibirTextoFiltro = true;
  }

  public removerFiltro() {
    this.exibirTextoFiltro = false;
    this.recuperarProdutos();
  }

  private validarQuantidadeProduto() {
    if(this.produtos.length > 0) {
      this.existeProduto = false
    }else {
      this.existeProduto = true
    }
  }

}
