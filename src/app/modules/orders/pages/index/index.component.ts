import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/modules/products/interface/product';
import { ProductsService } from 'src/app/modules/products/service/products.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  products: IProduct[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAll().subscribe(
      res => {
        this.products = res
        console.log(res)
      },
      err => console.error(err)
    )
  }

  

}
