import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import {
	ToastrModule
} from 'ngx-toastr';
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
import { NotfoundComponent } from './notfound/notfound.component';
import { BlogComponent } from './blog/blog.component';
import { SelfRegisterComponent } from './selfregister/selfregister.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogMainCardComponent } from './blog-main-card/blog-main-card.component'

@NgModule({
  declarations: [
		HomeComponent,
		HomeEmpComponent,
		LoginComponent,
		PrivacyComponent,
		NotfoundComponent,
		BlogComponent,
		SelfRegisterComponent,
		BlogsComponent,
		BlogCardComponent,
		BlogMainCardComponent
	],
  imports: [
    CommonModule,
		RouterModule,
		SharedModule,
		PagesRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		ToastrModule,
		QuillModule.forRoot()
  ]
})
export class PagesModule { }
