import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormBuilder,
	Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import {
	UserService
} from '@shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loading: boolean = false;
	token: string;
	loginForm = this.fb.group({
		username: ['', [
			Validators.required
		]],
		password: ['', [
			Validators.required
		]]
	});
	dataIsOk: boolean = false;

	get username() {
		return this.loginForm.get('username');
	}

	get password() {
		return this.loginForm.get('password');
	}

  constructor(
		private router: Router,
		private userService: UserService,
		private fb: FormBuilder
	) {

	}

  ngOnInit(): void {
  }

	getLogin() {
		Swal.fire('Espera');
		Swal.showLoading();
		if(!this.loginForm.valid) {
			Swal.hideLoading();
			Swal.close();
			Swal.fire({
				icon: 'warning',
				title: 'Favor de validar',
				html: 'Faltó algún dato. Favor de validar'
			});
			return;
		}
		this.userService.login(this.username.value,this.password.value).subscribe(data => {
			Swal.hideLoading();
			Swal.close();
			if(data && data.access_token) {
				localStorage.setItem('token',data.access_token);
				Swal.fire({
					icon: 'info',
					html: '<p>Ingreso exitoso</p>'
				})
			}
			this.router.navigate(['/pages/home']);
		}, error => {
			console.log(error);
			Swal.hideLoading();
			Swal.close();
			if(!error.status) {
				Swal.fire({
					icon: 'error',
					title: 'El servidor no responde',
					html: `<div class="container">
					Intenta más tarde.
					</div>
					<div class="card">
						<div class="card-header text-left">
							<small>Error:</small>
						</div>
						<div class="card-body">
							<small>${error.message}</small>
						</div>
					</div>`
				})
				return;
			}
			if(error.status === 404) {
				Swal.fire({
					icon: 'error',
					title: 'El usuario o contraseña no son correctos',
					html: `<div class="container">
					Intenta nuevamente
					</div>
					<div class="card">
						<div class="card-header text-left">
							<small>Error:</small>
						</div>
						<div class="card-body">
							<small>${error.message}</small>
						</div>
					</div>`
				})
				return;
			}
		})
	}

	toLowerCase(key: string) {
		let value = this.loginForm.get(key).value.toLowerCase();
		this.loginForm.get(key).setValue(value);
	}

}

// function mustBeValidEmail(field: FormControl) {
// 	let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
// 	let value = field.value;
// 	if(value === '') {
// 		return null;
// 	}
// 	value = value.toUpperCase();
// 	return emailRegex.test(value) ? null : {
// 		validateEmail: {
// 			valid: false
// 		}
// 	}
// }
