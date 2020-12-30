import { Component, OnInit } from '@angular/core';
import { Router } from '@Angular/router';
import {
	BlogsService
} from '../blogs.service';
import {
	ToastrService
} from 'ngx-toastr';

import Swal from 'sweetalert2';

declare const $:any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

	blogs: any;
	preurl: string;

  constructor(
		private blogsService: BlogsService,
		private router: Router,
		private toastr: ToastrService
	) {}

  ngOnInit(): void {
		this.getBlogs();
		// console.log(window.location.href);
		// console.log(window.location.protocol);
		// console.log(window.location.hostname);
		// console.log(window.location.port);
		this.preurl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/pages/blog`;
		$(function () {
			$('[data-toggle="tooltip"]').tooltip()
		})
  }

	copyMessage(val:string){
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = val;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
		// Swal.fire({
		// 	icon: 'success',
		// 	text: 'Liga copiada'
		// })
		this.toastr.success(
			'Liga copiada','',{
				positionClass: 'toast-top-left'
			}
		);
	}

	getBlogs() {
		Swal.fire('Espera...');
		Swal.showLoading();
		this.blogsService.getBlogs().subscribe((data:any) => {
			this.blogs = [...data];
			console.group('Blogs');
			console.log(this.blogs);
			console.groupEnd();
			setTimeout(() => {
				Swal.hideLoading();
				Swal.close();
			},800);
		}, error => {
			Swal.hideLoading();
			Swal.close();
			console.log(error);
		})
	}

	editBlog(articleid: string) {
		this.router.navigate(['/blogs/edit',articleid]);
	}

	viewBlog(articleid: string) {
		this.router.navigate(['/pages/blog',articleid]);
	}

	newBlog() {
		this.router.navigate(['/blogs/edit']);
	}
}
