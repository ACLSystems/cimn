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

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	token: string;
	expiration: Date;

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate(): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
	{
		this.token = this.userService.getToken();
		if(!this.token) {
			return this.router.createUrlTree(['/pages/login']);
		}
		const minMinutes = 10 * 60 * 1000;
		const now = new Date();
		const expiration = this.userService.getExpiration();
		if(!expiration) return this.router.createUrlTree(['/pages/login']);
		const diff = expiration.getTime() - now.getTime();
		if(diff > minMinutes) {
			return true;
		}
		return this.router.createUrlTree(['/pages/login']);
	}

}
