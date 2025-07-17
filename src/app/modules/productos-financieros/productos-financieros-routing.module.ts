import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';

const routes: Routes = [
  { path:'', component: ListadoProductosComponent },
  { path:'register-product', component: RegistrarProductoComponent },
  { path:'edit-product/:id', component: RegistrarProductoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosFinancierosRoutingModule { }
