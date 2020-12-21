import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
	FooterComponent,
	NavbarComponent
} from './components';

import {
	DateAgoPipe,
	SafePipe
} from './pipes';
import {
	UserService
} from './services';

export function tokenGetter() {
	return localStorage.getItem('token');
}

@NgModule({
  declarations: [
		FooterComponent,
		NavbarComponent,
		DateAgoPipe,
		SafePipe
	],
  imports: [
    CommonModule,
		RouterModule,
  ],
	providers: [
		UserService
	],
	exports: [
		CommonModule,
		DateAgoPipe,
		SafePipe,
		FooterComponent,
		NavbarComponent
	]
})
export class SharedModule { }
