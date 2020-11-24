import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeEmpComponent } from './home-emp/home-emp.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ComoingresosComponent } from './comoingresos/comoingresos.component';
import { GraciasingresosComponent } from './graciasingresos/graciasingresos.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},{
		path: 'comoingresos',
		component: ComoingresosComponent
	},{
		path: 'graciasingresos',
		component: GraciasingresosComponent
	},{
		path: 'empaudaz',
		component: HomeEmpComponent
	},{
		path: 'home',
		component: HomeComponent
	},{
		path: 'privacy',
		component: PrivacyComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(
		routes,{
    useHash: true,
    // enableTracing: true,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})
	],
  exports: [RouterModule]
})

export class AppRoutingModule { }
