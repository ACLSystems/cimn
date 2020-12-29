import { Injectable } from '@angular/core';
import {
	FormGroup,
	FormControl
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValtransService {

  constructor() { }

	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if(control instanceof FormControl) {
				control.markAsDirty({ onlySelf: true});
			} else if(control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}

	properCase(stringToModify: string) {
		if(!stringToModify) return stringToModify;
		var strings = stringToModify.split(' ');
		// console.log(strings);
		strings.forEach(word => {
			word = word.toLowerCase();
			word = word.charAt(0).toUpperCase() + word.slice(1);
		});
		if(strings.length === 1) return strings[0];
		return strings.join(' ');
	}

}
