import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse
} from '@angular/common/http';
import {
	Observable
} from 'rxjs';
import {
	environment
} from '../../../environments/environment';

export let JSONHeaders = new HttpHeaders ({
		'Content-Type':'application/json'
	});

@Injectable({
  providedIn: 'root'
})
export class UserService {

	url: string;

  constructor(
		private http: HttpClient
	) {
		this.url = environment.apiUrl;
	}

	login(
		username: string,
		password: string,
		strategy: string = 'local'
	): Observable<any> {
		const body = JSON.stringify({
			username,
			password
		});
		const route = `${this.url}/api/login`;
		return this.http.post(route,body,{headers:JSONHeaders});
	}

	emailValidate(
		id: string,
		code: string
	) {
		const body = JSON.stringify({
			id,code
		});
		const route = `${this.url}/api/user/${id}/${code}/validate`;
		return this.http.post(route,body,{headers:JSONHeaders});
	}

	getToken() {
		const token = localStorage.getItem('token');
		if (token !== 'undefined') return token;
		return null;
	}

	getUserProfile() {
		const httpOptions = {
			headers: JSONHeaders.set(
				'Authorization',
				`Bearer ${this.getToken()}`
			)
		}
		const route = `${this.url}/api/v1/user`;
		return this.http.get(route,httpOptions);
	}

	getMainPublicBlog() {
		const route = `${this.url}/api/blog/lastmainpublic`;
		return this.http.get(route);
	}

	getPublicBlogs() {
		const route = `${this.url}/api/blogs/lastpublic`;
		return this.http.get(route);
	}
}
