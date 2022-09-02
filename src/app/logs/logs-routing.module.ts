import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogsListagemComponent } from "./pages/listagem/logs-listagem/logs-listagem.component";


const routes: Routes = [
  { path: 'logs', component: LogsListagemComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class LogsRoutingModule {}
