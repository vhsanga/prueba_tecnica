import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../../core/services/modal.service';

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
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  openedDropdownId: string | null = null;

  constructor(
    private  apiService: ApiService,
    private router: Router,
    private modalService: ModalService
  ){}

  ngOnInit(): void {
    this.apiService.doGet('bp/products', {}, (data: any) => {
      this.lProducts = data;
      this.lProductsFiltered = data;
      this.updatePaginatedItems();
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  updatePaginatedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.totalPages = Math.ceil(this.lProducts.length / this.pageSize);
    this.lProductsFiltered = this.lProducts.slice(start, end);
  }

  editarProducto(producto:any){
    this.router.navigate(['/edit-product', producto.id]);
  }

  eliminarProducto(product:any){
    this.modalService.showConfirmation('¿Estás seguro de eliminar el producto   '+product.name+'?', () => {
      this.apiService.doDelete('bp/products/'+product.id, (response: any) => {
        this.lProducts = this.lProducts.filter(p => p.id !== product.id);
        this.searchItems(); 
        this.updatePaginatedItems(); 
        this.modalService.showSuccess(response.message);
      });
    });
  }

  toggleDropdown(id: string): void {
    if (this.openedDropdownId === id) {
      this.openedDropdownId = null; 
    } else {
      this.openedDropdownId = id; 
    }
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.openedDropdownId = null;
    }
  }

  
}
