import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { BlogsComponent } from './blogs/blogs.component';

import {
	BlogsRoutingModule
} from './blogs.routing.module';

import {
	BlogsService
} from './blogs.service';

import {
	SharedModule
} from '../shared';

import { EditComponent } from './edit/edit.component';
import { PhotosDisplayComponent } from './photos-display/photos-display.component';
import {
	EditNavBarComponent,
	MainNavbarComponent
} from './navbars';

@NgModule({
  declarations: [
		BlogsComponent,
		EditComponent,
		PhotosDisplayComponent,
		MainNavbarComponent,
		EditNavBarComponent
	],
  imports: [
    CommonModule,
		SharedModule,
		BlogsRoutingModule,
		QuillModule.forRoot(),
		FormsModule,
		ReactiveFormsModule
  ],
	providers: [
		BlogsService
	]
})
export class BlogsModule { }
