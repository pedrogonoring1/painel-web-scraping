import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MercadoListagemComponent } from "./pages/listagem/mercado-listagem/mercado-listagem.component";

const routes: Routes = [
  { path: 'mercado', component: MercadoListagemComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class MercadoRoutingModule {}
