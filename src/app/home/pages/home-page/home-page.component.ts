import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Route, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/shared/breadcrumb/models/breadcrumb';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public bradcrumb: Breadcrumb;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.instanciarBreadcrumb();
  }

  private instanciarBreadcrumb() {
    this.bradcrumb = new Breadcrumb({
      tituloPagina: 'Início',
      paths: [{nome: '/inicio', link: '/', ativo: true}]
    })
  }

  public redirecionarParaMercado(){
    this.router.navigate(['/mercado']);
  }

  public redirecionarParaProduto() {
    this.router.navigate(['/produto']);
  }

  public redirecionarParaProdutoMercado() {
    this.router.navigate(['/produto-mercado']);
  }

  public redirecionarParaLogs() {
    this.router.navigate(['/logs']);
  }

}
