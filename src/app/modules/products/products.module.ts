import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from './service/products.service';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ],
  exports: []
})
export class ProductsModule { }
