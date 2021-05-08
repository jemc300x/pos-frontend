import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ICustomer } from '../interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customers: ICustomer[] = [];
  private customers$: BehaviorSubject<ICustomer[]> = new BehaviorSubject<ICustomer[]>(this.customers);

  constructor() { }

  getAll(): Observable<ICustomer[]> {
    return this.customers$.asObservable();
  }

  create(customer: ICustomer): Observable<boolean> {
    this.customers.push(customer);
    this.customers$.next(this.customers);
    return of(true);
  }

  edit(customer: ICustomer): Observable<boolean> {
    this.customers = this.customers.filter(c => c.id !== customer.id);
    this.customers.push(customer);
    this.customers$.next(this.customers);
    return of(true);
  }

  delete(customer: ICustomer): Observable<boolean> {
    this.customers = this.customers.filter(c => c.id !== customer.id);
    this.customers$.next(this.customers);
    return of(true);
  }

}
