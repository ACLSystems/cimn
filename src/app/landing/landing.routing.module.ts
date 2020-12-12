import { NgModule } from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';

import {
	EmailvalidateComponent
} from './emailvalidate/emailvalidate.component';

const routes: Routes = [
	{
		path: 'emailvalidate/:id/:code',
		component: EmailvalidateComponent
	}
]

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class LandingRoutingModule {}
