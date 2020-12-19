import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { SharedModule } from "./shared";
import { MainLayoutComponent } from './layouts/main/main.component';

@NgModule({
  declarations: [
		AppComponent,
		MainLayoutComponent
	],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  bootstrap: [
		AppComponent
	]
})
export class AppModule {}
