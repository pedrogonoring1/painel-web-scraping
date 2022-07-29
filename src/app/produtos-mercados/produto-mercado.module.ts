import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ProdutoMercadoListagemComponent } from './pages/listagem/produto-mercado-listagem/produto-mercado-listagem.component';
import {MatTableModule} from '@angular/material/table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatMenuModule} from '@angular/material/menu';
import { ModalCadastrarProdutoMercadoComponent } from './components/modais/modal-cadastrar-produto-mercado/modal-cadastrar-produto-mercado.component';
import { ModalEditarProdutoMercadoComponent } from './components/modais/modal-editar-produto-mercado/modal-editar-produto-mercado.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [


    ProdutoMercadoListagemComponent,
        ModalCadastrarProdutoMercadoComponent,
        ModalEditarProdutoMercadoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    NgxDatatableModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProdutoMercadoModule {}
