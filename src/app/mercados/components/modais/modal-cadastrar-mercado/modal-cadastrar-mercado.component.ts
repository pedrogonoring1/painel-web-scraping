import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MercadoRequest } from 'src/app/mercados/models/requests/mercado.request';
import { MercadoService } from 'src/app/mercados/services/mercado.service';
import { MERCADO_FORMULARIO_COFNG } from './config/mercado-formulario.config';

@Component({
  selector: 'app-modal-cadastrar-mercado',
  templateUrl: './modal-cadastrar-mercado.component.html',
  styleUrls: ['./modal-cadastrar-mercado.component.css']
})
export class ModalCadastrarMercadoComponent implements OnInit {

  public modalRef?: BsModalRef;
  public formulario: FormGroup;
  public mercadoRequest: MercadoRequest;

  @Output() onFecharModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly modalService: BsModalService,
    private readonly mercadoService: MercadoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(MERCADO_FORMULARIO_COFNG);
  }

  public abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered', ignoreBackdropClick: true, keyboard: false});
  }

  public async salvarMercado() {
    try {
      this.spinner.show()
      const valoresFormulario = new MercadoRequest({
        Nome: this.formulario.value.Nome,
        LinkImage: this.formulario.value.LinkImage,
        UrlSite: this.formulario.value.UrlSite
      });

      await this.mercadoService.criar(valoresFormulario);
      this.fecharModal();
      this.onFecharModal.emit();
      this.spinner.hide();
      this.toast.success('Mercado cadastrado', 'Sucesso');

    } catch (error) {
      this.spinner.hide();
      this.toast.error('Erro ao cadastrar', 'Falha');
    }
  }

  public fecharModal() {
    this.formulario.reset();
    this.modalRef?.hide();
  }
}
