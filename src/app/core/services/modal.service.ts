import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalComponent!: ConfirmationModalComponent;

  register(modal: ConfirmationModalComponent) {
    this.modalComponent = modal;
  }

  showConfirmation(mensaje: string, onConfirm: () => void) {
    if (this.modalComponent) {
      this.modalComponent.show(mensaje, onConfirm);
    }
  }
}
