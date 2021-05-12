import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IProduct } from '../../interface/product';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {

  products: Array<IProduct> = [];
  productsFiltered: Array<IProduct> = [];
  @ViewChild('txtFilter', {static: true}) inputFilter!: ElementRef;
  private destroy$: Subject<void> = new Subject<void>();
  formProduct!: FormGroup;
  showModalProduct: boolean = false;
  showModalDelete: boolean = false;
  currentProduct!: IProduct;

  constructor(
    private productsService: ProductsService,
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

  private buildForm(): void {
    this.formProduct = this.fromBuilder.group({
      id: [],
      name: [],
      quantity: [],
      price: []
    });
  }

  getAll(): void {
    this.productsService.getAll().pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.products = res;
        this.productsFiltered = this.products;
      },
      err => console.error(err)
    )
  }

  onFilter(value: string ): void {
    if ( value === '') {
      this.productsFiltered = this.products;
      return;
    }
    this.productsFiltered = this.products.filter( p => p.name.toLowerCase().includes(String(value).toLowerCase()))
  }

  onSaveProduct(): void {
    console.log(this.formProduct.value);
    if (this.formProduct.get('id')?.value !== null) {
      this.productsService.edit(this.formProduct.value).pipe(takeUntil(this.destroy$)).subscribe(
        () => this.showModalProduct = false,
        err => console.log(err)
      );
    } else {
      this.productsService.create(this.formProduct.value).pipe(takeUntil(this.destroy$)).subscribe(
        res => {
          console.log(res)
          this.formProduct.reset();
          this.showModalProduct = false;
        },
        err => console.error(err)
        );
    }
  }

  onEditProduct(product: IProduct): void {
    this.showModalProduct = true;
    this.formProduct.setValue(product);
  }

  onShowModalProduct(): void {
    this.showModalProduct = true;
  }

  onDeleteProduct(product: IProduct): void {
    this.showModalDelete = true;
    this.currentProduct = product;
  }

  onConfirmDeleteProduct(): void {
    this.productsService.delete(this.currentProduct).subscribe(
      () => this.showModalDelete = false,
      err => console.error(err)
    )
  }

}
