import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  standalone: false,
  templateUrl: './loading-modal.component.html',
  styleUrl: './loading-modal.component.css'
})
export class LoadingModalComponent {
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
