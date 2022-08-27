import { NgModule } from '@angular/core';
import { MercadoCadastroComponent } from './pages/cadastro/mercado-cadastro/mercado-cadastro.component';
import { MercadoListagemComponent } from './pages/listagem/mercado-listagem/mercado-listagem.component';
import { BrowserModule } from '@angular/platform-browser';
import { ModalCadastrarMercadoComponent } from './components/modais/modal-cadastrar-mercado/modal-cadastrar-mercado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalEditarMercadoComponent } from './components/modais/modal-editar-mercado/modal-editar-mercado.component';
import { ConsultaMercadoComponent } from './components/consultas/consulta-mercado/consulta-mercado.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    MercadoCadastroComponent,
    MercadoListagemComponent,
    ModalCadastrarMercadoComponent,
    ModalEditarMercadoComponent,
    ConsultaMercadoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTooltipModule,
    SharedModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class MercadoModule {}
