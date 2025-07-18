import { Component } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  standalone: false,
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css'
})
export class SuccessModalComponent {
  msg = '';
  visible = false;

  show(msg: string) {
    this.msg = msg;
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
