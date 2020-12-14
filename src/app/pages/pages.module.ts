import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';

import {
	HomeComponent
} from './home/home.component';
import {
	HomeEmpComponent
} from './home-emp/home-emp.component';
import {
	LoginComponent
} from './login/login.component';
import {
	PrivacyComponent
} from './privacy/privacy.component';

import { PagesRoutingModule } from './pages.routing.module';

import {
	SharedModule
} from '@shared';
import { NotfoundComponent } from './notfound/notfound.component'

@NgModule({
  declarations: [
		HomeComponent,
		HomeEmpComponent,
		LoginComponent,
		PrivacyComponent,
		NotfoundComponent
	],
  imports: [
    CommonModule,
		RouterModule,
		SharedModule,
		PagesRoutingModule,
		FormsModule,
		ReactiveFormsModule
  ]
})
export class PagesModule { }
