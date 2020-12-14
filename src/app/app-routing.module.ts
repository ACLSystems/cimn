import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {
	PagesComponent
} from './layouts/pages/pages.component';
import {
	LandingComponent
} from './layouts/landing/landing.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/pages/home',
		pathMatch: 'full'
	},{
		path: 'home',
		redirectTo: '/pages/home',
		pathMatch: 'full'
	},{
		path: 'empaudaz',
		redirectTo: '/pages/empaudaz',
		pathMatch: 'full'
	},{
		path: 'privacy',
		redirectTo: '/pages/privacy',
		pathMatch: 'full'
	},{
		path: 'login',
		redirectTo: '/pages/login',
		pathMatch: 'full'
	},{
		path: '',
		component: PagesComponent,
		children: [
			{
				path: 'pages',
				loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule)
			}
		]
	},{
		path: 'comoingresos',
		redirectTo: '/landing/comoingresos',
		pathMatch: 'full'
	},{
		path: 'graciasingresos',
		redirectTo: '/landing/graciasingresos',
		pathMatch: 'full'
	},{
		path: '',
		component: LandingComponent,
		children: [
			{
				path: 'landing',
				loadChildren: () => import('./landing/landing.module').then(mod => mod.LandingModule)
			}
		]
	// },{
	// 	path: '',
	// 	component: LandingComponent,
	// 	children: [
	// 		{
	// 			path: 'blogs',
	// 			loadChildren: () => import('./blogs/blogs.module').then(mod => mod.BlogsModule)
	// 		}
	// 	]
}, {
	path: '**',
	redirectTo: '/pages/notfound',
	pathMatch: 'full'
}
];

@NgModule({
  imports: [
		RouterModule.forRoot(
			routes,{
		    useHash: true,
		    // enableTracing: true,
		    scrollPositionRestoration: 'enabled',
		    relativeLinkResolution: 'legacy'
			}
		)
	],
  exports: [
		RouterModule
	]
})

export class AppRoutingModule { }
