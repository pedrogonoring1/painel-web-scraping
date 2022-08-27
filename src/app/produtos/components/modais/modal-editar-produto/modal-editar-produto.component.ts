import { Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  public formulario: FormGroup;
  public produtoRequest: ProdutoRequest;

  @Output() onFecharModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() produtoResponse: ProdutoResponse;

  constructor(
    private readonly produtoService: ProdutoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: ProdutoResponse,
    private dialogRef: MatDialogRef<ModalEditarProdutoComponent>
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.preencherFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(PRODUTO_FORMULARIO_COFNG);
  }

  public preencherFormulario() {
    this.formulario.get('Nome')?.setValue(this.data.Nome);
    this.formulario.get('LinkImage')?.setValue(this.data.LinkImage);
  }

  public async salvarProduto() {
    console.log(this.formulario.value)
    try {
      this.spinner.show()
      const valoresFormulario = new ProdutoResponse({
        _id: this.data._id,
        Nome: this.formulario.value.Nome,
        LinkImage: this.formulario.value.LinkImage
      });
      await this.produtoService.editar(valoresFormulario);
      this.spinner.hide();
      this.toast.success('Produto editado', 'Sucesso');
      this.dialogRef.close(true);
    } catch (error) {
      this.spinner.hide();
      this.toast.error('Erro ao editar', 'Falha');
    }
  }
}
