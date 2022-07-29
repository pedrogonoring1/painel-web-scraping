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
      { prop: 'LinkImage', name: 'Imagem', width: 78, cellTemplate: this.imgTemplate },
      { prop: 'NomeProduto', name: 'Produto', width: 400},
      { prop: 'NomeMercado', name: 'Mercado', width: 300},
      { prop: 'Valor', pipe: new CurrencyFormatPipe(), width: 155},
      { name: 'Ação', cellTemplate: this.dropMenu, with: 5, headerClass: 'text-end'}
    ];
  }

  public async recuperarProdutoMercados() {
    try {
      this.loadingIndicator = true;
      this.produtosMercados = await this.produtoMercadoService.recuperarProdutoListagem();
      this.loadingIndicator = false;
    } catch (error) {
      this.loadingIndicator = false;
      this.toastr.error('Falha ao recuperar Produto Mercado', 'Falha')
    }
  }

}
