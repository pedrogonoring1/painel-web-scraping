import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProdutoResponse } from 'src/app/produtos/models/responses/produto.response';
import { ProdutoService } from 'src/app/produtos/services/produto.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { ModalCadastrarProdutoComponent } from 'src/app/produtos/components/modais/modal-cadastrar-produto/modal-cadastrar-produto.component';
import { Breadcrumb } from 'src/app/shared/breadcrumb/models/breadcrumb';
import { ConfirmComponent } from 'src/app/shared/dialog/confirm/confirm.component';
import { ModalEditarProdutoComponent } from 'src/app/produtos/components/modais/modal-editar-produto/modal-editar-produto.component';

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
  public bradcrumb: Breadcrumb;

  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private clipboard: Clipboard,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.instanciarBreadcrumb();
    this.produtos = new Array<ProdutoResponse>();
    this.existeProduto = false;
    this.recuperarProdutos();
    this.nomeProdutoFiltro = "";
    this.exibirTextoFiltro = false;
  }

  private instanciarBreadcrumb() {
    this.bradcrumb = new Breadcrumb({
      tituloPagina: 'Produtos',
      paths: [{nome: '/home', link: '/', ativo: true}, {nome: '/produto', link: '/produto', ativo: false}]
    })
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
    } catch (error: any) {
      this.spinner.hide()
      this.toastr.error(error.error, 'Falha')
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

  public openDialog() {
    const dialogRef = this.dialog.open(ModalCadastrarProdutoComponent, {width: '500px'});

    dialogRef.afterClosed().subscribe(result => {
        this.recuperarProdutos();
    });
  }

  public abrirDialogConfirm(produto: any) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.excluirMercado(produto)
    });
  }

  public abrirDialogEdit(produto: any) {
    const dialogRef = this.dialog.open(ModalEditarProdutoComponent, {
      data: produto, width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.recuperarProdutos()
    });
  }

  public copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.toastr.success('Id copiado', 'Sucesso')
  }

}
