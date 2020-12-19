import { NgModule } from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';

import {
	BlogsComponent
} from './blogs/blogs.component';
import {
	EditComponent
} from './edit/edit.component';

const routes: Routes = [
	{
		path: '',
		component: BlogsComponent
	},{
		path: 'edit',
		component: EditComponent
	}, {
		path: 'edit/:articleid',
		component: EditComponent
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
export class BlogsRoutingModule {}
