import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
import { SuccessModalComponent } from '../../shared/success-modal/success-modal.component';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalConfirmationComponent!: ConfirmationModalComponent;
  private modalSuccessComponent!: SuccessModalComponent;
  private modalErrorComponent!: ErrorModalComponent; // Assuming you have an ErrorModalComponent

  register(modalConfirmationComponent: ConfirmationModalComponent, modalSuccessComponent: SuccessModalComponent, modalErrorComponent: ErrorModalComponent) {
    this.modalConfirmationComponent = modalConfirmationComponent;
    this.modalSuccessComponent = modalSuccessComponent;
    this.modalErrorComponent = modalErrorComponent;
  }

  showConfirmation(mensaje: string, onConfirm: () => void) {
    if (this.modalConfirmationComponent) {
      this.modalConfirmationComponent.show(mensaje, onConfirm);
    }
  }

  showSuccess(mensaje: string) {
    if (this.modalSuccessComponent) {
      this.modalSuccessComponent.show(mensaje);
    }
  }

  showError(mensaje: string) {
    if (this.modalErrorComponent) {
      this.modalErrorComponent.show(mensaje);
    }
  }
}
