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
		QuillModule.forRoot({
			modules: {
				syntax: false,
				toolbar: [
			    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
			    ['blockquote', 'code-block'],
			    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
			    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
			    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
			    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
			    [{ 'direction': 'rtl' }],                         // text direction
			    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
			    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
			    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
			    [{ 'font': [] }],
			    [{ 'align': [] }],
			    ['clean'],                                         // remove formatting button
			    ['link', 'video']                         // link and image, video
			  ]
			}
		}),
		FormsModule,
		ReactiveFormsModule
  ],
	providers: [
		BlogsService
	]
})
export class BlogsModule { }
