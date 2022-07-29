import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ProdutoListagemComponent } from './pages/listagens/produto-listagem/produto-listagem.component';
import { ConsultaProdutoComponent } from './components/consultas/consulta-produto/consulta-produto.component';
import { ModalCadastrarProdutoComponent } from './components/modais/modal-cadastrar-produto/modal-cadastrar-produto.component';
import { ModalEditarProdutoComponent } from './components/modais/modal-editar-produto/modal-editar-produto.component';

@NgModule({
  declarations: [
    ProdutoListagemComponent,
    ConsultaProdutoComponent,
    ModalCadastrarProdutoComponent,
    ModalEditarProdutoComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule, MatCardModule],
})
export class ProdutoModule {}
