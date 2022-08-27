import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MercadoResponse } from 'src/app/mercados/models/responses/mercado.response';
import { MercadoService } from 'src/app/mercados/services/mercado.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Breadcrumb } from 'src/app/shared/breadcrumb/models/breadcrumb';
import { ModalCadastrarMercadoComponent } from 'src/app/mercados/components/modais/modal-cadastrar-mercado/modal-cadastrar-mercado.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/dialog/confirm/confirm.component';
import { ModalEditarMercadoComponent } from 'src/app/mercados/components/modais/modal-editar-mercado/modal-editar-mercado.component';

@Component({
  selector: 'app-mercado-listagem',
  templateUrl: './mercado-listagem.component.html',
  styleUrls: ['./mercado-listagem.component.css']
})
export class MercadoListagemComponent implements OnInit {

  public mercados: Array<MercadoResponse>;
  public existeMercado: boolean;
  public nomeMercadoFiltro: string;
  public exibirTextoFiltro: boolean;
  public bradcrumb: Breadcrumb;

  constructor(private mercadoService: MercadoService,
    private readonly toastr: ToastrService,
    private readonly spinner: NgxSpinnerService,
    private readonly clipboard: Clipboard,
    private readonly dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.instanciarBreadcrumb();
    this.mercados = new Array<MercadoResponse>();
    this.existeMercado = false;
    this.recuperarMercados();
    this.nomeMercadoFiltro = "";
    this.exibirTextoFiltro = false;
  }

  private instanciarBreadcrumb() {
    this.bradcrumb = new Breadcrumb({
      tituloPagina: 'Mercados',
      paths: [{nome: '/home', link: '/', ativo: true}, {nome: '/mercados', link: '/mercado', ativo: false}]
    })
  }

  public async recuperarMercados() {
    try {
      this.spinner.show()
      this.mercados = await this.mercadoService.recuperar();
      this.validarQuantidadeMercado();
      this.spinner.hide()

    } catch (error) {
      this.spinner.hide()
      this.toastr.error('Falha ao recuperar mercados', 'Erro')
    }
  }

  public async excluirMercado(mercadoResponse: MercadoResponse) {
    try {
      this.spinner.show()
      await this.mercadoService.excluir(mercadoResponse);
      await this.recuperarMercados()
      this.spinner.hide()
      this.toastr.success('Mercado Excluído', 'Sucesso')
    } catch (error: any) {
      this.spinner.hide()
      this.toastr.error(error.error, 'Falha')
    }
  }

  public atualizarMercadosResponse(mercadosResponses: Array<MercadoResponse>) {
    this.mercados = mercadosResponses;
    this.validarQuantidadeMercado();
  }

  public atualizarTextoFiltro(textoFiltro: string) {
    this.nomeMercadoFiltro = textoFiltro;
    this.exibirTextoFiltro = true;
  }

  public removerFiltro() {
    this.exibirTextoFiltro = false;
    this.recuperarMercados();
  }

  private validarQuantidadeMercado() {
    if(this.mercados.length > 0) {
      this.existeMercado = false
    }else {
      this.existeMercado = true
    }
  }

  public openDialogCadastro() {
    const dialogRef = this.dialog.open(ModalCadastrarMercadoComponent, {width: '500px'});

    dialogRef.afterClosed().subscribe(result => {
        this.recuperarMercados();
    });
  }

  public abrirDialogConfirm(mercado: any) {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.excluirMercado(mercado)
    });
  }

  public abrirDialogEdit(mercado: any) {
    const dialogRef = this.dialog.open(ModalEditarMercadoComponent, {
      data: mercado, width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.recuperarMercados()
    });
  }

  public copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.toastr.success('Id copiado', 'Sucesso')
  }

}
