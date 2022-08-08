import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProdutoListagemResponse } from 'src/app/produtos-mercados/models/responses/produto-listagem.response';
import { ProdutoMercadoService } from 'src/app/produtos-mercados/services/services/produto-mercado.service';
import { CurrencyFormatPipe } from 'src/app/shared/pipes/currency';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalCadastrarProdutoMercadoComponent } from 'src/app/produtos-mercados/components/modais/modal-cadastrar-produto-mercado/modal-cadastrar-produto-mercado.component';
import { ConfirmComponent } from 'src/app/shared/dialog/confirm/confirm.component';
import { ModalEditarProdutoMercadoComponent } from 'src/app/produtos-mercados/components/modais/modal-editar-produto-mercado/modal-editar-produto-mercado.component';
import { ProdutoMercadoResponse } from 'src/app/produtos-mercados/models/responses/produto-mercado.response';

export interface User {
  name: string;
}

@Component({
  selector: 'app-produto-mercado-listagem',
  templateUrl: './produto-mercado-listagem.component.html',
  styleUrls: ['./produto-mercado-listagem.component.css']
})
export class ProdutoMercadoListagemComponent implements OnInit {

  @ViewChild('imgTemplate') imgTemplate: TemplateRef<any>;
  @ViewChild('dropMenu') dropMenu: TemplateRef<any>;

  public produtosMercados: Array<ProdutoListagemResponse>;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns: Array<{}>;
  public existeMercado: boolean;
  public nomeMercadoFiltro: string;
  public exibirTextoFiltro: boolean;

  myControl = new FormControl<string | User>('');
  options: User[] = [{name: 'Arroz Sepé'}, {name: 'Shelley'}, {name: 'Coca Cola'}];
  filteredOptions: Observable<User[]>;

  constructor(
    private produtoMercadoService: ProdutoMercadoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.recuperarProdutoMercados();
    this.configColumns();
    this.nomeMercadoFiltro = "";
    this.exibirTextoFiltro = false;
    this.existeMercado = false;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalCadastrarProdutoMercadoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.recuperarProdutoMercados();
    });
  }

  ngAfterViewInit() {
    this.configColumns()
  }

  private configColumns() {
    this.columns = [
      { prop: 'Produto.LinkImage', name: 'Imagem', width: 78, cellTemplate: this.imgTemplate },
      { prop: 'Produto.Nome', name: 'Produto', width: 400},
      { prop: 'Mercado.Nome', name: 'Mercado', width: 485},
      { prop: 'Valor', pipe: new CurrencyFormatPipe(), width: 155},
      { name: 'Ação', cellTemplate: this.dropMenu, with: 5, headerClass: 'text-end'}
    ];
  }

  public async recuperarProdutoMercados() {
    try {
      this.loadingIndicator = true;
      this.produtosMercados = await this.produtoMercadoService.recuperarProdutoListagem();
      this.loadingIndicator = false;
      this.validarQuantidadeMercado();
    } catch (error) {
      this.loadingIndicator = false;
      this.toastr.error('Falha ao recuperar Produto Mercado', 'Falha')
    }
  }

  public atualizarProdutoMercadosResponse(produtoMercadosResponses: Array<ProdutoListagemResponse>) {
    this.produtosMercados = produtoMercadosResponses;
    this.validarQuantidadeMercado();
  }

  public atualizarTextoFiltro(textoFiltro: string) {
    this.nomeMercadoFiltro = textoFiltro;
    this.exibirTextoFiltro = true;
  }

  private validarQuantidadeMercado() {
    if(this.produtosMercados.length > 0) {
      this.existeMercado = false
    }else {
      this.existeMercado = true
    }
  }

  private async excluirProdutoMercado(produtoMercado: any) {
    try {
      this.spinner.show()
      await this.produtoMercadoService.excluir(produtoMercado)
      this.spinner.hide()
      this.toastr.success('Produto Mercado Excluido', 'Sucesso')
      this.recuperarProdutoMercados()
    } catch (error) {
      this.toastr.error('Falha ao excluir Produto Mercado', 'Falha')
    }
  }

  public abrirDialogConfirm(produtoMercado: any) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.excluirProdutoMercado(produtoMercado)
    });
  }

  public abrirDialogEdit(produtoMercado: any) {
    const dialogRef = this.dialog.open(ModalEditarProdutoMercadoComponent, {
      data: produtoMercado,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.recuperarProdutoMercados()
    });
  }

}
