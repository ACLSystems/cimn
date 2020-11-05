import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HomeEmpComponent } from './home-emp/home-emp.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ComoingresosComponent } from './comoingresos/comoingresos.component';
import { GraciasingresosComponent } from './graciasingresos/graciasingresos.component';
import { SafePipe } from './shared/pipes/video.pipe';

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
		SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
