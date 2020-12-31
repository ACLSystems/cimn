import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {
	Article,
	SupportingServices,
	UserService
} from '@shared';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

	blogs: Article[] = [];
	loading: boolean;

  constructor(
		private support: SupportingServices,
		private userService: UserService
	) {
		this.getBlogs();
	}

  ngOnInit(): void {
  }

	getBlogs() {
		this.loading = true;
		Swal.fire('Cargando. Espera...');
		Swal.showLoading();
		this.userService.getPublicBlogs().subscribe(data => {
			if(data.length > 0) {
				// this.support.print('Data',data);
				this.blogs = blockArray([...data,...data],5);
				this.support.print('Blogs',this.blogs);
			}
			Swal.hideLoading();
			Swal.close();
			this.loading = false;
		}, error => {
			Swal.hideLoading();
			Swal.close();
			console.log(error);
		});
	}

}

function blockArray(arrayToBlock: any[], size: number) {
	// console.group('Function BlockArray');
	// console.log(arrayToBlock);
	let mainArray = [];
	let childArray = [];
	for(let i=0; i<arrayToBlock.length; i++) {
		if(childArray.length < size) {
			childArray.push(arrayToBlock[i]);
		} else {
			mainArray.push([...childArray]);
			childArray = [];
			childArray.push(arrayToBlock[i]);
			// console.log(mainArray);
		}
	}
	if(childArray.length > 0) {
		mainArray.push([...childArray]);
		// console.log(mainArray);
	}
	// console.groupEnd();
	return mainArray;
}
