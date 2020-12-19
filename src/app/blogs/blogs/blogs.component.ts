import { Component, OnInit } from '@angular/core';
import { Router } from '@Angular/router';
import {
	BlogsService
} from '../blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

	blogs: any;

  constructor(
		private blogsService: BlogsService,
		private router: Router
	) {
	}

  ngOnInit(): void {
		this.getBlogs();
  }

	getBlogs() {
		this.blogsService.getBlogs().subscribe((data:any) => {
			this.blogs = [...data];
			console.log(this.blogs);
		}, error => {
			console.log(error);
		})
	}

	editBlog(articleid: string) {
		this.router.navigate(['/blogs/edit',articleid]);
	}

	newBlog() {
		this.router.navigate(['/blogs/edit']);
	}
}
