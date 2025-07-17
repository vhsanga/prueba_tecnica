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
  constructor(private  apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.doGet('bp/products', {}, (data: any) => {
      console.log("Productos obtenidos:", data);
      this.lProducts = data;
    });
  }

  editarProducto(producto:any){}

  eliminarProducto(idProducto:string){}

  
}
