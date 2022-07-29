import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoListagemComponent } from "./pages/listagens/produto-listagem/produto-listagem.component";

const routes: Routes = [
  { path: 'produto', component: ProdutoListagemComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class ProdutoRoutingModule {}
