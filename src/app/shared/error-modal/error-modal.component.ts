import { Component } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  standalone: false,
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent {
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
