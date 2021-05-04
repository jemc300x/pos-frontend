import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  products: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 100; index++) {
      this.products.push({name: `PRODUCT ${index}`, quantity: index * 2})      
    }
  }

}
