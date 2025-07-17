import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';

const routes: Routes = [
  { path:'', component: ListadoProductosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosFinancierosRoutingModule { }
