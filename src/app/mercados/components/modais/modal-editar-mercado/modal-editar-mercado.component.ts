import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  public formulario: FormGroup;
  public mercadoRequest: MercadoRequest;

  @Output() onFecharModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() mercadoResponse: MercadoResponse;

  constructor(
    private readonly mercadoService: MercadoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: MercadoResponse,
    private dialogRef: MatDialogRef<ModalEditarMercadoComponent>) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.preencherFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(MERCADO_FORMULARIO_COFNG);
  }

  public preencherFormulario() {
    this.formulario.get('Nome')?.setValue(this.data.Nome);
    this.formulario.get('LinkImage')?.setValue(this.data.LinkImage);
    this.formulario.get('UrlSite')?.setValue(this.data.UrlSite);
  }

  public async salvarMercado() {
    try {
      this.spinner.show()
      const valoresFormulario = new MercadoResponse({
        _id: this.data._id,
        Nome: this.formulario.value.Nome,
        LinkImage: this.formulario.value.LinkImage,
        UrlSite: this.formulario.value.UrlSite
      });

      await this.mercadoService.editar(valoresFormulario);
      this.spinner.hide();
      this.toast.success('Mercado editado', 'Sucesso');
      this.dialogRef.close(true);
    } catch (error) {
      this.spinner.hide();
      this.toast.error('Erro ao editar', 'Falha');
    }
  }
}
