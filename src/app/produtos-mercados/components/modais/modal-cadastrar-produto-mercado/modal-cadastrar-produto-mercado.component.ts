import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MercadoResponse } from 'src/app/mercados/models/responses/mercado.response';
import { MercadoService } from 'src/app/mercados/services/mercado.service';
import { ProdutoMercadoRequest } from 'src/app/produtos-mercados/models/requests/produto-mercado.request';
import { ProdutoMercadoService } from 'src/app/produtos-mercados/services/services/produto-mercado.service';
import { ProdutoResponse } from 'src/app/produtos/models/responses/produto.response';
import { ProdutoService } from 'src/app/produtos/services/produto.service';
import { PRODUTO_MERCADO_FORMULARIO_COFING } from './config/produto-mercado-formulario.config';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-modal-cadastrar-produto-mercado',
  templateUrl: './modal-cadastrar-produto-mercado.component.html',
  styleUrls: ['./modal-cadastrar-produto-mercado.component.css']
})

export class ModalCadastrarProdutoMercadoComponent implements OnInit {

  public modalRef?: BsModalRef;
  public formulario: FormGroup;
  public produtoMercadoRequest: ProdutoMercadoRequest;
  public produtos: Array<ProdutoResponse>;
  public mercados: Array<MercadoResponse>;
  public formControlProduto = new FormControl<ProdutoResponse>(new ProdutoResponse({}));
  public formControlMercado = new FormControl<MercadoResponse>(new MercadoResponse({}));
  public formControlLink = new FormControl<string>('');

  filteredMercados: Observable<MercadoResponse[]>;
  filteredProdutos: Observable<ProdutoResponse[]>;

  @Output() onFecharModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly modalService: BsModalService,
    private readonly produtoMercadoService: ProdutoMercadoService,
    private readonly produtoService: ProdutoService,
    private readonly mercadoService: MercadoService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly toast: ToastrService
  )
  { }

  ngOnInit(): void {
    this.recuperarTodosProdutosTodosMercados();
    this.criarFormulario();
  }

  private ouvirFilters() {
    this.filteredProdutos = this.formControlProduto.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.Nome;
        return name ? this._filterProduto(name as string) : this.produtos.slice();
      }),
    );

    this.filteredMercados = this.formControlMercado.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.Nome;
        return name ? this._filterMercado(name as string) : this.mercados.slice();
      }),
    );
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

  public async salvarProduto() {
    try {
      //this.spinner.show()
      const produtoMercadoFormulario = new ProdutoMercadoRequest({
        Valor: 0,
        Link: this.formulario.value.Link,
        IdMercado: this.formControlMercado.value?._id,
        IdProduto: this.formControlProduto.value?._id,
      });
      await this.produtoMercadoService.criar(produtoMercadoFormulario);
      this.onFecharModal.emit();
      //this.spinner.hide();
      this.toast.success('Produto Mercado cadastrado', 'Sucesso');

    } catch (error) {
      this.spinner.hide();
      this.toast.error('Erro ao cadastrar', 'Falha');
    }
  }

  public async recuperarTodosProdutosTodosMercados() {
    try {
      this.spinner.show()
      this.produtos = await this.produtoService.recuperar();
      this.mercados = await this.mercadoService.recuperar();
      this.ouvirFilters();
      this.spinner.hide()
    } catch (error) {
      this.spinner.hide()
      this.toast.error('Falha ao recuperar dados', 'Falha');
    }
  }
}
