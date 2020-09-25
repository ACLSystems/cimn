import { Component } from '@angular/core';
import {
	Router,
	RouterEvent,
	NavigationStart,
	NavigationEnd
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cimn';

	navigate: boolean = false;

	constructor(
		private router: Router
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
				}
			});
	}


}
