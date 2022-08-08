import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MercadoResponse } from 'src/app/mercados/models/responses/mercado.response';
import { ProdutoMercadoRequest } from 'src/app/produtos-mercados/models/requests/produto-mercado.request';
import { ProdutoResponse } from 'src/app/produtos/models/responses/produto.response';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProdutoMercadoResponse } from 'src/app/produtos-mercados/models/responses/produto-mercado.response';
import { ProdutoMercadoService } from 'src/app/produtos-mercados/services/services/produto-mercado.service';
import { ProdutoService } from 'src/app/produtos/services/produto.service';
import { MercadoService } from 'src/app/mercados/services/mercado.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PRODUTO_MERCADO_FORMULARIO_COFING } from '../modal-cadastrar-produto-mercado/config/produto-mercado-formulario.config';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoListagemResponse } from 'src/app/produtos-mercados/models/responses/produto-listagem.response';

@Component({
  selector: 'app-modal-editar-produto-mercado',
  templateUrl: './modal-editar-produto-mercado.component.html',
  styleUrls: ['./modal-editar-produto-mercado.component.css']
})
export class ModalEditarProdutoMercadoComponent implements OnInit {

  public formulario: FormGroup;
  public produtoMercadoRequest: ProdutoMercadoRequest;
  public produtos: Array<ProdutoResponse>;
  public mercados: Array<MercadoResponse>;
  public formControlProduto = new FormControl<ProdutoResponse>(new ProdutoResponse({}), Validators.required);
  public formControlMercado = new FormControl<MercadoResponse>(new MercadoResponse({}), Validators.required);
  public disabled: boolean;

  filteredMercados: Observable<MercadoResponse[]>;
  filteredProdutos: Observable<ProdutoResponse[]>;
  filterFormulario: Observable<ProdutoMercadoResponse>;

  constructor(
    private readonly produtoMercadoService: ProdutoMercadoService,
    private readonly produtoService: ProdutoService,
    private readonly mercadoService: MercadoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService,
    public dialogRef: MatDialogRef<ModalEditarProdutoMercadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProdutoListagemResponse,
  ) { }

  ngOnInit(): void {
    this.disabled = true;
    this.criarFormulario();
    this.recuperarTodosProdutosTodosMercados();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private preencherForm() {
    this.formulario.get('Link')?.setValue(this.data.Link)
    this.formulario.get('Valor')?.setValue(this.data.Valor)
    this.formControlMercado.setValue(this.data.Mercado)
    this.formControlProduto.setValue(this.data.Produto)
  }

  private ouvirFilters() {
    this.filteredProdutos = this.formControlProduto.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.Nome;
        this.verificarFormPreenchidoValido()
        return name ? this._filterProduto(name as string) : this.produtos.slice();
      }),
    );

    this.filteredMercados = this.formControlMercado.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.Nome;
        this.verificarFormPreenchidoValido()
        return name ? this._filterMercado(name as string) : this.mercados.slice();
      }),
    );

    const inputForm$ = this.formulario.valueChanges.pipe()

    inputForm$.subscribe(x => {
      this.verificarFormPreenchidoValido()
    })
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group(PRODUTO_MERCADO_FORMULARIO_COFING);
  }

  displayFnMercado(mercado: MercadoResponse): string {
    return mercado && mercado.Nome ? mercado.Nome : '';
  }

  displayFnProduto(produto: ProdutoResponse): string {
    return produto && produto.Nome ? produto.Nome : '';
  }

  private _filterMercado(name: string): MercadoResponse[] {
    const filterValue = name.toLowerCase();
    return this.mercados.filter(option => option.Nome.toLowerCase().includes(filterValue));
  }

  private _filterProduto(name: string): ProdutoResponse[] {
    const filterValue = name.toLowerCase();
    return this.produtos.filter(option => option.Nome.toLowerCase().includes(filterValue));
  }

  private verificarFormPreenchidoValido() {
    if(this.formulario.value.Link !== '' && this.formControlMercado.value?._id !== undefined && this.formControlProduto.value?._id !== undefined)
      this.disabled = false;
    else
      this.disabled = true;
  }

  public async salvarEdicao() {
    try {
      const produtoMercadoFormulario = new ProdutoMercadoResponse({
        _id: this.data._id,
        Valor: this.formulario.value.Valor,
        Link: this.formulario.value.Link,
        IdMercado: this.formControlMercado.value?._id,
        IdProduto: this.formControlProduto.value?._id,
      });

      await this.produtoMercadoService.editar(produtoMercadoFormulario);
      this.toast.success('Produto Mercado editado', 'Sucesso');

    } catch (error) {
      this.spinner.hide();
      this.toast.error('Erro ao editar', 'Falha');
    }
  }

  public async recuperarTodosProdutosTodosMercados() {
    try {
      this.produtos = await this.produtoService.recuperar();
      this.mercados = await this.mercadoService.recuperar();
      this.preencherForm()
      this.ouvirFilters();
    } catch (error) {
      this.spinner.hide()
      this.toast.error('Falha ao recuperar dados', 'Falha');
    }
  }

}
