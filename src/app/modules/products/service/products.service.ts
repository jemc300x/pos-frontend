import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: IProduct[] = []

  constructor() { 
    for (let index = 0; index < 100; index++) {
      this.products.push({ id: index, name: `PRODUCT ${index}`, quantity: index * 2})      
    }
  }

  getAll(): Observable<IProduct[]> {
    return of(this.products);
  }

  create(product: IProduct): Observable<IProduct> {
    this.products.push(product);
    return of(product);
  }

  edit(product: IProduct): Observable<IProduct> {
    this.products.forEach(product => {
      if (product.id === product.id) {
        product = product
      }
    });

    return of(product);
  }
}
