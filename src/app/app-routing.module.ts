import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutingModule } from './home/home-routing.module';
import { LogsRoutingModule } from './logs/logs-routing.module';
import { MercadoRoutingModule } from './mercados/mercado-routing.module';
import { ProdutoMercadoRoutingModule } from './produtos-mercados/produto-mercado-routing.module';
import { ProdutoRoutingModule } from './produtos/produto-routing.module';

const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    MercadoRoutingModule,
    ProdutoRoutingModule,
    ProdutoMercadoRoutingModule,
    LogsRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
