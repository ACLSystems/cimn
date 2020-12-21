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
} from '../../../environments/environment';
import {
	JwtHelperService
} from '@auth0/angular-jwt';
import {
	Roles
} from '../types';

const jwt = new JwtHelperService();

const JSONHeaders = new HttpHeaders ({
		'Content-Type':'application/json'
	});

@Injectable({
  providedIn: 'root'
})
export class UserService {

	url: string;

  constructor(
		private http: HttpClient,
	) {
		this.url = environment.apiUrl;
	}

	login(
		username: string,
		password: string,
		// strategy: string = 'local'
	): Observable<any> {
		const body = JSON.stringify({
			username,
			password
		});
		const route = `${this.url}/api/login`;
		return this.http.post(route,body,{headers:JSONHeaders});
	}

	register(
		firstName: string,
		lastName: string,
		email: string,
		uriResource: string = null
	): Observable<any> {
		const body = JSON.stringify({
			name: email,
			firstName,
			lastName,
			email,
			password: random(),
			uriResource
		})
		// console.log(body);
		const route = `${this.url}/api/user`;
		return this.http.post(route,body,{headers:JSONHeaders});
	}

	emailValidate(
		id: string,
		code: string,
		token: boolean = false
	): Observable<any>  {
		const body = JSON.stringify({
			id,code
		});
		const route = token ?
			`${this.url}/api/user/${id}/${code}/validatetoken` :
			`${this.url}/api/user/${id}/${code}/validate`
			;
		return this.http.patch(route,body,{headers:JSONHeaders});
	}

	getToken(): string| null {
		const token = localStorage.getItem('token');
		if (!token) return null;
		return token;
	}

	tokenExpirationDate() {
		return jwt.getTokenExpirationDate(this.getToken());
	}

	isTokenExpired(): boolean {
		const token = this.getToken();
		const expired = jwt.isTokenExpired(token);
		return expired;
	}

	getRoles(): Roles | null {
		const roles: Roles = JSON.parse(localStorage.getItem('roles'));
		if(!roles) return null;
		if(typeof roles.exp === 'string') roles.exp = new Date(roles.exp);
		return roles;
	}

	setRoles(roles: Roles) {
		localStorage.setItem('roles',JSON.stringify(roles));
	}

	getExpiration(): Date | null {
		let exp:any = localStorage.getItem('exp');
		if(!exp) return null;
		if(typeof exp === 'string') exp = new Date(exp);
		return exp;
	}

	setProfile(
		username:string,
		sub: string,
		exp: Date
	) {
		localStorage.setItem('username',username);
		localStorage.setItem('sub',sub);
		localStorage.setItem('exp',exp.toString())
	}

	removeProfile() {
		localStorage.removeItem('token');
		localStorage.removeItem('exp');
		localStorage.removeItem('roles');
		localStorage.removeItem('sub');
		localStorage.removeItem('username');
	}

	getUserProfile(): Observable<any> {
		const httpOptions = {
			headers: JSONHeaders.set(
				'Authorization',
				`Bearer ${this.getToken()}`
			)
		}
		const route = `${this.url}/api/v1/user`;
		return this.http.get(route,httpOptions);
	}

	getMainPublicBlog(): Observable<any>  {
		const route = `${this.url}/api/blog/lastmainpublic`;
		return this.http.get(route);
	}

	getPublicBlogs(): Observable<any>  {
		const route = `${this.url}/api/blogs/lastpublic`;
		return this.http.get(route);
	}
}


function random(
	lenghOfCode: number = 8,
	possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
): string {
	let text = '';
	for(let i = 0; i < lenghOfCode; i++) {
		text += possible.charAt(Math.floor(Math.random()* possible.length));
	}
	return text;
}
