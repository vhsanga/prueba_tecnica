import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../../../../core/utils/utils';

@Component({
  selector: 'app-registrar-producto',
  standalone: false,
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css'
})
export class RegistrarProductoComponent implements OnInit, AfterViewInit {
  productForm: FormGroup= new FormGroup({});
  @ViewChild('inputId') inputIdRef!: ElementRef;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputIdRef.nativeElement.focus();
    }, 0);
  }

  saveProduct(){
    if (this.productForm.valid) {
      const datos = this.productForm.value;
      this.apiService.doPost('bp/products', datos, (response: any) => {
        console.log("Producto registrado:", response);
        // Aquí puedes manejar la respuesta después de registrar el producto
        // Por ejemplo, redirigir a otra página o mostrar un mensaje de éxito
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  clearForm(){
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    setTimeout(() => {
      this.inputIdRef.nativeElement.focus();
    }, 0);
  }

  verifyExist(){
    const id = this.productForm.get('id')?.value;
    if (id && this.productForm.get('id')?.valid) {
      this.apiService.doGet('bp/products/verification/'+id, {  }, (existe: any) => {
        console.log("Verificación de ID:", existe);
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
    console.log("validar fecha:"+(fechaSeleccionada < hoy));
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
    }
  }
}
