import { Component, OnInit } from '@angular/core';
import {
	Router,
	ActivatedRoute
} from '@angular/router';
import Swal from 'sweetalert2';

import {
	UserService
} from '../../shared/services/user.service';

@Component({
  selector: 'app-emailvalidate',
  templateUrl: './emailvalidate.component.html',
  styleUrls: ['./emailvalidate.component.scss']
})
export class EmailvalidateComponent implements OnInit {

	id: string;
	code: string;
	token: string;

  constructor(
		private userService: UserService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.activatedRoute.params.subscribe(params => {
			this.id = params['id'];
			this.code = params['code'];
		})
	}

  ngOnInit(): void {
		Swal.fire('Espera. Estamos revisando tu acceso');
		Swal.showLoading();
		this.userService.emailValidate(this.id,this.code).subscribe((data:any) => {
			Swal.hideLoading();
			Swal.close();
			if(data && data.access_token) {
				localStorage.setItem('token',data.access_token);
			}
			this.router.navigate(['/home']);
		}, error => {
			console.log(error);
			Swal.hideLoading();
			Swal.close();
			if(error.error && error.error.error && error.error.error === 'Código incorrecto') {
				Swal.fire({
					icon: 'warning',
					html: `<p>Esta liga ya se ha usado antes o no es correcta</p>
					<p>Intenta ingresar nuevamente</p>`
				});
				this.router.navigate(['/login']);
			}
		});
  }

}
