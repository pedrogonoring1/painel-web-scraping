import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoMercadoListagemComponent } from "./pages/listagem/produto-mercado-listagem/produto-mercado-listagem.component";

const routes: Routes = [
  { path: 'produto-mercado', component: ProdutoMercadoListagemComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class ProdutoMercadoRoutingModule {}
