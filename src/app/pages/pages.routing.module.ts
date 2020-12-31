import { NgModule } from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';

import {
	HomeComponent
} from './home/home.component';
import {
	HomeEmpComponent
} from './home-emp/home-emp.component';
import {
	BlogComponent
} from './blog/blog.component';
import {
	BlogsComponent
} from './blogs/blogs.component';
import {
	LoginComponent
} from './login/login.component';
import {
	PrivacyComponent
} from './privacy/privacy.component';
import {
	NotfoundComponent
} from './notfound/notfound.component';
import {
	SelfRegisterComponent
} from './selfregister/selfregister.component';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},{
		path: 'empaudaz',
		component: HomeEmpComponent
	},{
		path: 'blogs',
		component: BlogsComponent
	},{
		path: 'blog/:articleid',
		component: BlogComponent
	},{
		path: 'login',
		component: LoginComponent
	},{
		path: 'privacy',
		component: PrivacyComponent
	},{
		path: 'register',
		component: SelfRegisterComponent
	},{
		path: 'notfound',
		component: NotfoundComponent
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
export class PagesRoutingModule {}
