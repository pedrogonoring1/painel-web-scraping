import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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

}
