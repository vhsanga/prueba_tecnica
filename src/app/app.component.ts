import { Component, ViewChild } from '@angular/core';
import { ModalService } from './core/services/modal.service';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';
import { SuccessModalComponent } from './shared/success-modal/success-modal.component';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(ConfirmationModalComponent) modalConfirmationComponent!: ConfirmationModalComponent;
  @ViewChild(SuccessModalComponent) modalSuceesComponent!: SuccessModalComponent;
  @ViewChild(ErrorModalComponent) modalErrorComponent!: ErrorModalComponent;
  
  title = 'prueba_tecnica_softka';

  constructor(
    private modalService: ModalService,
  ) {}

  ngAfterViewInit() {
    this.modalService.register(this.modalConfirmationComponent, this.modalSuceesComponent, this.modalErrorComponent);
  }
}
