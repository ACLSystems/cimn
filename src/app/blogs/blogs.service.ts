import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders
} from '@angular/common/http';
import {
	Observable
} from 'rxjs';
import {
	environment
} from '../../environments/environment';
import {
	Article
} from './edit/article.type';

export let JSONHeaders = new HttpHeaders ({
		'Content-Type':'application/json'
	});

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

	url: string;

  constructor(
		private http: HttpClient
	) {
		this.url = environment.apiUrl;
	}

	getToken() {
		const token = localStorage.getItem('token');
		if (token !== 'undefined') return token;
		return null;
	}

	getBlogs(): Observable<any> {
		const httpOptions = {
			headers: JSONHeaders.set(
				'Authorization',
				`Bearer ${this.getToken()}`
			)
		}
		const route = `${this.url}/api/v1/blogs`;
		return this.http.get(route,httpOptions);
	}

	getPhotos(
		query: string,
		page: number = 1,
		per_page: number = 18,
		// orientation?: string
	): Observable<any>{
		let route = `${this.url}/api/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`;
		// if(orientation) route = `${route}&orientation=${orientation}`;
		// console.log(route);
		return this.http.get(route);
	}

	getPhoto(
		photoId: string
	): Observable<any> {
		let route = `${this.url}/api/photo?photoid=${photoId}`;
		return this.http.get(route);
	}

	sendArticle(article: Article, articleId?: string): Observable<any> {
		const httpOptions = {
			headers: JSONHeaders.set(
				'Authorization',
				`Bearer ${this.getToken()}`
			)
		}
		console.log(article);
		let route = articleId  ?
			`${this.url}/api/v1/blog/${articleId}` :
			`${this.url}/api/v1/blog`;
		return articleId ?
			this.http.patch(route,article,httpOptions) :
			this.http.post(route,article,httpOptions);
	}

	getArticle(id: string): Observable<any> {
		const httpOptions = {
			headers: JSONHeaders.set(
				'Authorization',
				`Bearer ${this.getToken()}`
			)
		}
		let route = `${this.url}/api/v1/blog/${id}`;
		return this.http.get(route,httpOptions);
	}

}
