import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HomeEmpComponent } from './home-emp/home-emp.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ComoingresosComponent } from './comoingresos/comoingresos.component';
import { GraciasingresosComponent } from './graciasingresos/graciasingresos.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';

import {
	SharedModule
} from './shared';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HomeEmpComponent,
    PrivacyComponent,
    ComoingresosComponent,
    GraciasingresosComponent,
		LoginComponent,
		LandingComponent
  ],
  imports: [
    BrowserModule,
		HttpClientModule,
    AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
