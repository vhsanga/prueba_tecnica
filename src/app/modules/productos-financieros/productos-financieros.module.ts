import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosFinancierosRoutingModule } from './productos-financieros-routing.module';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';


@NgModule({
  declarations: [
    ListadoProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosFinancierosRoutingModule
  ]
})
export class ProductosFinancierosModule { }
