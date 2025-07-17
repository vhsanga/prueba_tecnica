import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosFinancierosRoutingModule } from './productos-financieros-routing.module';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { HeaderComponent } from '../../shared/header/header.component';


@NgModule({
  declarations: [
    ListadoProductosComponent,
    RegistrarProductoComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ProductosFinancierosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductosFinancierosModule { }
