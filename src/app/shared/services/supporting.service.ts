import { Injectable } from '@angular/core';

import {
	environment
} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportingServices {
	constructor() { }

	print(title:string,obj:any) {
		if(environment.production) return;
		console.group(title);
		console.log(obj);
		console.groupEnd();
	}
}
