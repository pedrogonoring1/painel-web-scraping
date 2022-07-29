import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProdutoRequest } from 'src/app/produtos/models/requests/produto.request';
import { ProdutoResponse } from 'src/app/produtos/models/responses/produto.response';
import { ProdutoService } from 'src/app/produtos/services/produto.service';
import { PRODUTO_FORMULARIO_COFNG } from './config/produto-formulario.config';

@Component({
  selector: 'app-modal-editar-produto',
  templateUrl: './modal-editar-produto.component.html',
  styleUrls: ['./modal-editar-produto.component.css']
})
export class ModalEditarProdutoComponent implements OnInit {

  public modalRef?: BsModalRef;
  public formulario: FormGroup;
  public produtoRequest: ProdutoRequest;

  @Output() onFecharModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() produtoResponse: ProdutoResponse;

  constructor(
    private readonly modalService: BsModalService,
    private readonly produtoService: ProdutoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.preencherFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(PRODUTO_FORMULARIO_COFNG);
  }

  public abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered', ignoreBackdropClick: true, keyboard: false});
  }

  public preencherFormulario() {
    this.formulario.get('Nome')?.setValue(this.produtoResponse.Nome);
    this.formulario.get('LinkImage')?.setValue(this.produtoResponse.LinkImage);
  }

  public async salvarProduto() {
    try {
      this.spinner.show()
      const valoresFormulario = new ProdutoResponse({
        _id: this.produtoResponse._id,
        Nome: this.formulario.value.Nome,
        LinkImage: this.formulario.value.LinkImage
      });

      await this.produtoService.editar(valoresFormulario);
      this.fecharModal();
      this.spinner.hide();
      this.toast.success('Produto editado', 'Sucesso');

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
