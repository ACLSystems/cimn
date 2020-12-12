import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
	DateAgoPipe,
	SafePipe
} from './pipes';
import {
	UserService
} from './services';

@NgModule({
  declarations: [
		DateAgoPipe,
		SafePipe
	],
  imports: [
    CommonModule
  ],
	providers: [
		UserService
	],
	exports: [
		DateAgoPipe,
		SafePipe
	]
})
export class SharedModule { }
