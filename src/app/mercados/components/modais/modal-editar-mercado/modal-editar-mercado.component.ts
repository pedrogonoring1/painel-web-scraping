import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MercadoRequest } from 'src/app/mercados/models/requests/mercado.request';
import { MercadoResponse } from 'src/app/mercados/models/responses/mercado.response';
import { MercadoService } from 'src/app/mercados/services/mercado.service';
import { MERCADO_FORMULARIO_COFNG } from './config/mercado-formulario.config';

@Component({
  selector: 'app-modal-editar-mercado',
  templateUrl: './modal-editar-mercado.component.html',
  styleUrls: ['./modal-editar-mercado.component.css']
})
export class ModalEditarMercadoComponent implements OnInit {
  public modalRef?: BsModalRef;
  public formulario: FormGroup;
  public mercadoRequest: MercadoRequest;

  @Output() onFecharModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() mercadoResponse: MercadoResponse;

  constructor(
    private readonly modalService: BsModalService,
    private readonly mercadoService: MercadoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.preencherFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(MERCADO_FORMULARIO_COFNG);
  }

  public abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered', ignoreBackdropClick: true, keyboard: false});
  }

  public preencherFormulario() {
    this.formulario.get('Nome')?.setValue(this.mercadoResponse.Nome);
    this.formulario.get('LinkImage')?.setValue(this.mercadoResponse.LinkImage);
    this.formulario.get('UrlSite')?.setValue(this.mercadoResponse.UrlSite);
  }

  public async salvarMercado() {
    try {
      this.spinner.show()
      console.log(this.mercadoResponse._id)
      const valoresFormulario = new MercadoResponse({
        _id: this.mercadoResponse._id,
        Nome: this.formulario.value.Nome,
        LinkImage: this.formulario.value.LinkImage,
        UrlSite: this.formulario.value.UrlSite
      });

      await this.mercadoService.editar(valoresFormulario);
      this.fecharModal();
      this.spinner.hide();
      this.toast.success('Mercado editado', 'Sucesso');

    } catch (error) {
      this.spinner.hide();
      this.toast.error('Erro ao editar', 'Falha');
    }
  }

  public fecharModal() {
    this.formulario.reset();
    this.modalRef?.hide();
    this.onFecharModal.emit();
  }
}
