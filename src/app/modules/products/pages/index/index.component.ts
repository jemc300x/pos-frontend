import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface IProduct {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {

  products: Array<IProduct> = [];
  productsFiltered: Array<IProduct> = [];
  @ViewChild('txtFilter', {static: true}) inputFilter: ElementRef;

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 100; index++) {
      this.products.push({name: `PRODUCT ${index}`, quantity: index * 2})      
    }
    this.productsFiltered = this.products;
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.inputFilter.nativeElement, 'keyup')
      .pipe(debounceTime(400))
      .subscribe((value) => this.onFilter(String(value.target.value)))
  }

  onFilter(value: string ): void {
    if ( value === '') {
      this.productsFiltered = this.products;
      return;
    }
    this.productsFiltered = this.products.filter( p => p.name.toLowerCase().includes(String(value).toLowerCase()))
  }

}
