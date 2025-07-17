import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-listado-productos',
  standalone: false,
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent implements OnInit {
  lProducts: any[] = [];
  lProductsFiltered: any[] = [];
  filter:string = '';
  constructor(private  apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.doGet('bp/products', {}, (data: any) => {
      console.log("Productos obtenidos:", data);
      this.lProducts = data;
      this.lProductsFiltered = data;
    });
  }


  getIniciales(nombre: string): string {
    if (!nombre) return '';
    const palabras = nombre.trim().toUpperCase().split(/\s+/);
    const iniciales = palabras.slice(0, 2).map(p => p[0]).join('');
    return iniciales;
  }

  searchItems(){
    const filtroLower = this.filter.toLowerCase();
    this.lProductsFiltered = this.lProducts.filter(p =>
      p.name.toLowerCase().includes(filtroLower)
    );
  }

  editarProducto(producto:any){}

  eliminarProducto(idProducto:string){}

  
}
