import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ICustomer } from '../../interface/customer';
import { CustomersService } from '../../service/customers.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  customers: Array<ICustomer> = [];
  customersFiltered: Array<ICustomer> = [];
  @ViewChild('txtFilter', {static: true}) inputFilter!: ElementRef;
  private destroy$: Subject<void> = new Subject<void>();
  formCustomer!: FormGroup;
  showModalCustomer: boolean = false;
  showModalDelete: boolean = false;
  currentCustomer!: ICustomer;

  constructor(
    private customersService: CustomersService,
    private fromBuilder: FormBuilder
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.getAll();
    this.buildForm();
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.inputFilter.nativeElement, 'keyup')
      .pipe(debounceTime(400), takeUntil(this.destroy$))
      .subscribe((value) => this.onFilter(String(value.target.value)))
  }

  buildForm(): void {
    this.formCustomer = this.fromBuilder.group({
      id: [],
      fullname: [],
    });
  }

  getAll(): void {
    this.customersService.getAll().pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        console.log('Res', res);
        this.customers = res;
        this.customersFiltered = this.customers;
      },
      err => console.error(err)
    )
  }

  onFilter(value: string ): void {
    if ( value === '') {
      this.customersFiltered = this.customers;
      return;
    }
    this.customersFiltered = this.customers.filter( p => p.fullname.toLowerCase().includes(String(value).toLowerCase()))
  }

  onSaveCustomer(): void {
    console.log(this.formCustomer.value);
    if (this.formCustomer.get('id')?.value !== null) {
      console.log('IF')
      this.customersService.edit(this.formCustomer.value).pipe(takeUntil(this.destroy$)).subscribe(
        () => this.showModalCustomer = false,
        err => console.log(err)
      );
    } else {
      console.log('ELSE')
      // this.customersService.create(this.formCustomer.value);
      this.customersService.create(this.formCustomer.value).pipe(takeUntil(this.destroy$)).subscribe(
        res => {
          console.log(res)
          this.formCustomer.reset();
          this.showModalCustomer = false;
        },
        err => console.error(err)
        );
    }
  }

  onEditCustomer(customer: ICustomer): void {
    this.showModalCustomer = true;
    this.formCustomer.setValue(customer);
  }

  onShowModalCustomer(): void {
    this.showModalCustomer = true;
  }

  onDeleteCustomer(customer: ICustomer): void {
    this.showModalDelete = true;
    this.currentCustomer = customer;
  }

  onConfirmDeleteProduct(): void {
    this.customersService.delete(this.currentCustomer).subscribe(
      () => this.showModalDelete = false,
      err => console.error(err)
    )
  }

}
