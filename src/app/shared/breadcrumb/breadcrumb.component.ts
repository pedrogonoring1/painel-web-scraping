import { Component, Input, OnInit } from '@angular/core';
import { Breadcrumb } from './models/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadcrumb: Breadcrumb;

  constructor() { }

  ngOnInit(): void {
  }

}
