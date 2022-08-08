import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public text: string;

  constructor() { }

  ngOnInit(): void {
    this.text = 'Deseja realmente excluir?';
  }

}
