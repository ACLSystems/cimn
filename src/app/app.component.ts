import { Component } from '@angular/core';
import {
	Router,
	RouterEvent,
	NavigationStart,
	NavigationEnd
} from '@angular/router';
import {
	UserService,
	Roles
} from '@shared';
import jwt_decode from 'jwt-decode';

declare let gtag:Function;
declare let fbq:Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cimn';

	navigate: boolean = false;

	constructor(
		private router: Router,
		private readonly userService: UserService
	) {
		const siteName = document.location.hostname;
		if(siteName.includes('emprendedor')) {
			this.router.navigate(['/empaudaz']);
		}
		this.router.events.subscribe((event: RouterEvent) => {
				if(event instanceof NavigationStart) {
					// console.log('Comenzando navegación');
					this.navigate = true;
				} else if(event instanceof NavigationEnd) {
					// console.log('Terminando navegación');
					this.navigate = false;
					gtag('config','UA-109066795-1',{'page_path' : event.url});
        	fbq('track', 'PageView');
				}
			});
			const token:string = this.userService.getToken();
			if(token) {
				var exp: Date = this.userService.getExpiration();
				if(exp){
					const now = new Date();
					if(now.getTime() > exp.getTime()) {
						console.log('EXPIRADO!');
						this.userService.removeProfile();
					} else {
						console.log('Token vigente');
					}
				}
				const token_decoded = this.getDecodedAccessToken(token);
				var expiration = new Date(token_decoded.exp*1000);
				// console.group('Token');
				// console.log(token_decoded);
				// console.log(expiration);
				// console.groupEnd();
				localStorage.setItem('username',token_decoded.username);
				localStorage.setItem('sub',token_decoded.sub);
				localStorage.setItem('exp',expiration.toString());
				const roles: Roles = this.userService.getRoles();
				if(!roles) {
					this.getProfile();
				} else {
					const exp = new Date(roles.exp);
					const now = new Date();
					if(now.getTime() > exp.getTime()) {
						this.getProfile();
					}
				}
			}
	}

	getDecodedAccessToken(token: string): any {
		try {
			return jwt_decode(token);
		} catch (err)  {
			return null;
		}
	}

	getProfile() {
		this.userService.getUserProfile().subscribe((data:any) => {
			data.roles.exp = new Date();
			data.roles.exp.setTime(data.roles.exp.getTime() + 3600 * 1000);
			this.userService.setRoles(data.roles);
			return true;
		}, error => {
			console.log(error);
			return null;
		});
	}

}
