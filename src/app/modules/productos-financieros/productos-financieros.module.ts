import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosFinancierosRoutingModule } from './productos-financieros-routing.module';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListadoProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosFinancierosRoutingModule,
    FormsModule
  ]
})
export class ProductosFinancierosModule { }
