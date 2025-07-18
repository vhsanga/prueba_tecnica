import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../../../../core/utils/utils';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-registrar-producto',
  standalone: false,
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css'
})
export class RegistrarProductoComponent implements OnInit, AfterViewInit {
  productForm: FormGroup= new FormGroup({});
  @ViewChild('inputId') inputIdRef!: ElementRef;
  isEditMode: boolean = false;
  productData : any = null

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: ModalService
  ){}

  ngOnInit() {
    this.productForm = this.fb.group({
        id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        logo: ['', Validators.required],
        date_release: ['', Validators.required],
        date_revision:  [{ value: '', disabled: true }]
      });

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.apiService.doGet('bp/products/'+id, {}, (data: any) => {
        this.productData = data;
        this.productForm.patchValue({
          id: data.id,
          name: data.name,
          description: data.description,
          logo: data.logo,
          date_release: data.date_release,
          date_revision: data.date_revision
        });
        this.productForm.get('id')?.disable();
        this.isEditMode = true;
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputIdRef.nativeElement.focus();
    }, 0);
  }

  saveProduct(){
    
    if (this.productForm.valid) {
      const datos = this.productForm.getRawValue();
      if(this.isEditMode){
        this.apiService.doPut('bp/products/'+datos.id, datos, (response: any) => {
          this.modalService.showSuccess(response.message);
        });
      }else{
        this.apiService.doPost('bp/products', datos, (response: any) => {
          this.modalService.showSuccess(response.message);
          this.productForm.reset();
        });
      }
      
    } else {
      this.productForm.markAllAsTouched();
      this.modalService.showError("Por favor, completa todos los campos requeridos.");
    }
  }

  clearForm(){
    if(this.isEditMode) {
      this.productForm.patchValue({
          id: this.productData.id,
          name: this.productData.name,
          description: this.productData.description,
          logo: this.productData.logo,
          date_release: this.productData.date_release,
          date_revision: this.productData.date_revision
      });
    }else{
      this.productForm.reset();
      this.productForm.markAsPristine();
      this.productForm.markAsUntouched();
      setTimeout(() => {
        this.inputIdRef.nativeElement.focus();
      }, 0);
    }
    
  }

  verifyExist(){
    const id = this.productForm.get('id')?.value;
    if (id && this.productForm.get('id')?.valid) {
      this.apiService.doGet('bp/products/verification/'+id, {  }, (existe: any) => {
        if (existe) {
        // Puedes poner un error personalizado en el formulario
        this.productForm.get('id')?.setErrors({ idExistente: true });
      } else {
        // Limpia el error si ya no existe
        const errors = this.productForm.get('id')?.errors;
        if (errors) {
          delete errors['idExistente'];
          this.productForm.get('id')?.setErrors(Object.keys(errors).length ? errors : null);
        }
      }
      });
    }
  }

  validateDateRelease(){
    const control = this.productForm.get('date_release');
    const fechaSeleccionada = new Date(control?.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    fechaSeleccionada.setHours(0, 0, 0, 0);
    if (fechaSeleccionada < hoy) {
      control?.setErrors({ fechaPasada: true });
    } else {
      const errors = control?.errors;
      if (errors) {
        delete errors['fechaPasada'];
        control?.setErrors(Object.keys(errors).length ? errors : null);
      }
      fechaSeleccionada.setFullYear(fechaSeleccionada.getFullYear() + 1);
      this.productForm.get('date_revision')?.setValue(Utils.formatDate(fechaSeleccionada));
      const datos = this.productForm.value;
    }
  }
}
