import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { ProductsModule } from '../products/products.module';

const CustomSelectOptions: INgxSelectOptions = {
  keepSelectedItems: true, 
  optionValueField: 'id',
  optionTextField: 'name',
};

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    ProductsModule
  ]
})
export class OrdersModule { }
