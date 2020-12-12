import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
	EmailvalidateComponent
} from './emailvalidate/emailvalidate.component';

import {
	LandingRoutingModule
} from './landing.routing.module';

@NgModule({
  declarations: [EmailvalidateComponent],
  imports: [
    CommonModule,
		LandingRoutingModule
  ]
})
export class LandingModule { }
