import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(h => h.HomeModule) },
  { path:'products', loadChildren: () => import('./modules/products/products.module').then(p => p.ProductsModule) },
  { path:'customers', loadChildren: () => import('./modules/customers/customers.module').then(c => c.CustomersModule) },
  { path:'orders', loadChildren: () => import('./modules/orders/orders.module').then(o => o.OrdersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
