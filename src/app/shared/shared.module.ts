import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
	FileSaverModule
} from 'ngx-filesaver';
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
		FileSaverModule
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
