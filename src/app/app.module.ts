import { BrowserModule } from "@angular/platform-browser";
import {
	BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
	NgModule,
	CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { RouterModule } from "@angular/router";
import {
	HttpClientModule,
	HTTP_INTERCEPTORS
} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
	ToastrModule
} from 'ngx-toastr';
import {
	NgxSpinnerModule
} from 'ngx-spinner';

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { SharedModule } from "./shared";
import { MainLayoutComponent } from './layouts/main/main.component';

import {
	HttpErrorInterceptor,
	LoaderInterceptor
} from './interceptors';

@NgModule({
  declarations: [
		AppComponent,
		MainLayoutComponent
	],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
		ToastrModule.forRoot({
			timeOut: 10000,
			positionClass: 'toast-top-right',
			preventDuplicates: true,
			progressAnimation: 'decreasing',
			tapToDismiss: true
		}),
		NgxSpinnerModule
  ],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoaderInterceptor,
			multi: true
		}
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [
		AppComponent
	]
})
export class AppModule {}
