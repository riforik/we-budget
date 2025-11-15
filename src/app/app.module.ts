import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment.prod';
import { LoginButtonComponent } from 'src/app/components/login-button.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FileInputComponent } from './components/shared/inputs/file-input/file-input.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginButtonComponent,
    HttpClientModule,
    DashboardComponent,
    FileInputComponent,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  exports: [DashboardComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
