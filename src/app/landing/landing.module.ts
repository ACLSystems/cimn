import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';

import {
	EmailvalidateComponent
} from './emailvalidate/emailvalidate.component';
import {
	ComoingresosComponent
} from './comoingresos/comoingresos.component';
import {
	GraciasingresosComponent
} from './graciasingresos/graciasingresos.component';

import {
	LandingRoutingModule
} from './landing.routing.module';
import {
	PresupuestoComponent
} from './presupuesto/presupuesto.component';

import {
	SharedModule
} from '@shared';

@NgModule({
  declarations: [
		ComoingresosComponent,
		EmailvalidateComponent,
		GraciasingresosComponent,
		PresupuestoComponent
	],
  imports: [
    CommonModule,
		RouterModule,
		SharedModule,
		LandingRoutingModule,
		FormsModule,
		ReactiveFormsModule
  ]
})
export class LandingModule { }
