import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L1Component } from './layout/l1/l1.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/l1/header/header.component';



@NgModule({
  declarations: [
    L1Component,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    L1Component
  ]
})
export class CoreModule { }
