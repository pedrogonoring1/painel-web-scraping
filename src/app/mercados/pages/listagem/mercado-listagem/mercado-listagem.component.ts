import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MercadoResponse } from 'src/app/mercados/models/responses/mercado.response';
import { MercadoService } from 'src/app/mercados/services/mercado.service';
import { Clipboard } from '@angular/cdk/clipboard';


import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Router } from '@angular/router';


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

  constructor(private mercadoService: MercadoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private confirmBoxEvokeService: ConfirmBoxEvokeService,
    private readonly router: Router,
    private clipboard: Clipboard) { }

  ngOnInit(): void {
    this.mercados = new Array<MercadoResponse>();
    this.existeMercado = false;
    this.recuperarMercados();
    this.nomeMercadoFiltro = "";
    this.exibirTextoFiltro = false;
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

  public copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.toastr.success('Id copiado', 'Sucesso')
  }

}
