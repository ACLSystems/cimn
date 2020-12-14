import { NgModule } from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';

import {
	ComoingresosComponent
} from './comoingresos/comoingresos.component';
import {
	EmailvalidateComponent
} from './emailvalidate/emailvalidate.component';
import {
	GraciasingresosComponent
} from './graciasingresos/graciasingresos.component';
import {
	PresupuestoComponent
} from './presupuesto/presupuesto.component';

const routes: Routes = [
	{
		path: 'emailvalidate/:id/:code',
		component: EmailvalidateComponent
	},{
		path: 'comoingresos',
		component: ComoingresosComponent
	},{
		path: 'graciasingresos',
		component: GraciasingresosComponent
	},{
		path: 'budget',
		component: PresupuestoComponent
	},{
		path: 'budget/:userid/:code',
		component: PresupuestoComponent
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
