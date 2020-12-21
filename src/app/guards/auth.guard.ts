import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
	UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	UserService
} from '@shared';

const LOGIN = '/pages/login';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	token: string;
	expiration: Date;

	constructor(
		private userService: UserService,
		private router: Router
	) {

	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		boolean |
		UrlTree |
		Promise<boolean | UrlTree> |
		Observable<boolean | UrlTree>
	{
		// console.group('Auth Guard');
		// console.log('State url',state.url);
		// console.groupEnd();
		if(!this.userService.getToken()) return this.router.navigate([LOGIN],
			{
				queryParams: {
					returnUrl: state.url
				}
			}
		);
		if(this.userService.isTokenExpired()) return this.router.createUrlTree([LOGIN],
			{
				queryParams: {
					returnUrl: state.url
				}
			}
		);
		return true;
	}

}
