import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: false,
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  msg = '';
  visible = false;
  private onConfirmCallback: (() => void) | null = null;

  show(msg: string, onConfirm: () => void) {
    this.msg = msg;
    this.onConfirmCallback = onConfirm;
    this.visible = true;
  }

  confirm() {
    this.visible = false;
    if (this.onConfirmCallback) this.onConfirmCallback();
  }

  cancel() {
    this.visible = false;
  }
}
