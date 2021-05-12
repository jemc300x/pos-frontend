import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { IProduct } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: IProduct[] = [];
  products$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(this.products);

  constructor() { 
    for (let index = 0; index < 100; index++) {
      this.products.push({ 
        id: index, 
        name: `PRODUCT ${index}`, 
        quantity: index * 2,
        price: 1 + index
      })      
    }
  }

  getAll(): Observable<IProduct[]> {
    this.products$.next(this.products)
    return this.products$.asObservable();
  }

  create(product: IProduct): Observable<boolean> {
    this.products.push(product);
    this.products$.next(this.products);
    return of(true);
  }

  edit(product: IProduct): Observable<boolean> {
    console.log(product);
    this.products = this.products.filter(p => p.id !== product.id);
    this.products.push(product);
    this.products$.next(this.products)
    return of(true);
  }

  delete(product: IProduct): Observable<boolean> {
    this.products = this.products.filter(p => p.id !== product.id);
    this.products$.next(this.products);    
    return of(true);
  }
}
