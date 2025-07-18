import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
import { SuccessModalComponent } from '../../shared/success-modal/success-modal.component';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';
import { LoadingModalComponent } from '../../shared/loading-modal/loading-modal.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalConfirmationComponent!: ConfirmationModalComponent;
  private modalSuccessComponent!: SuccessModalComponent;
  private modalErrorComponent!: ErrorModalComponent; 
  private modalLoadingComponent!: LoadingModalComponent; 

  register(modalConfirmationComponent: ConfirmationModalComponent, modalSuccessComponent: SuccessModalComponent, modalErrorComponent: ErrorModalComponent, modalLoadingComponent: LoadingModalComponent) {
    this.modalConfirmationComponent = modalConfirmationComponent;
    this.modalSuccessComponent = modalSuccessComponent;
    this.modalErrorComponent = modalErrorComponent;
    this.modalLoadingComponent = modalLoadingComponent;
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

  showLoading(mensaje: string) {
    if (this.modalLoadingComponent) {
      this.modalLoadingComponent.show(mensaje);
    }
  }
  closeLoading() {
    if (this.modalLoadingComponent) {
      this.modalLoadingComponent.close()
    }
  }
}
