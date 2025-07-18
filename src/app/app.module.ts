import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';
import { SuccessModalComponent } from './shared/success-modal/success-modal.component';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationModalComponent,
    SuccessModalComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
