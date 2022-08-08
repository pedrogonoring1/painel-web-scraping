import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProdutoRequest } from 'src/app/produtos/models/requests/produto.request';
import { ProdutoService } from 'src/app/produtos/services/produto.service';
import { PRODUTO_FORMULARIO_COFNG } from './config/produto-formulario.config';

@Component({
  selector: 'app-modal-cadastrar-produto',
  templateUrl: './modal-cadastrar-produto.component.html',
  styleUrls: ['./modal-cadastrar-produto.component.css']
})
export class ModalCadastrarProdutoComponent implements OnInit {

  public modalRef?: BsModalRef;
  public formulario: FormGroup;
  public produtoRequest: ProdutoRequest;
  public continuarCadastrando: boolean = false;
  public color: ThemePalette = 'primary';

  @Output() onFecharModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly modalService: BsModalService,
    private readonly produtoService: ProdutoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService,
    private dialogRef: MatDialogRef<ModalCadastrarProdutoComponent>
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(PRODUTO_FORMULARIO_COFNG);
  }

  public abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered', ignoreBackdropClick: true, keyboard: false});
  }

  public async salvarProduto() {
    try {
      this.spinner.show()
      const valoresFormulario = new ProdutoRequest({
        Nome: this.formulario.value.Nome,
        LinkImage: this.formulario.value.LinkImage,
      });

      await this.produtoService.criar(valoresFormulario);
      this.fecharModal();
      this.onFecharModal.emit();
      this.spinner.hide();
      this.toast.success('Produto cadastrado', 'Sucesso');

    } catch (error) {
      this.spinner.hide();
      this.toast.error('Erro ao cadastrar', 'Falha');
    }
  }

  public fecharModal() {
    if(!this.continuarCadastrando)
      this.dialogRef.close();

    this.formulario.reset();
  }
}
