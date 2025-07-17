import { Component, ViewChild } from '@angular/core';
import { ModalService } from './core/services/modal.service';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(ConfirmationModalComponent) modalComponent!: ConfirmationModalComponent;
  title = 'prueba_tecnica_softka';

  constructor(
    private modalService: ModalService,
  ) {}

  ngAfterViewInit() {
    this.modalService.register(this.modalComponent);
  }
}
