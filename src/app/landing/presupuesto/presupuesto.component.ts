import {
	Component,
	OnInit
} from '@angular/core';
import {
	Router,
	ActivatedRoute
} from '@angular/router';
import {
	FormBuilder,
	Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import {
	UserService,
	ValtransService
} from '@shared';

const THIS_URI = 'budget';
const DOWNLOAD = 'https://www.dropbox.com/s/p8v5h3jm4v3ob1b/Formato%20Presupuesto%20Mensual%20CIMN_2020.pdf?dl=1';
const FILENAME = 'prespuesto.pdf';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {

	download: string = DOWNLOAD;
	file: boolean = false;
	fileName: string = FILENAME;
	registerForm = this.fb.group({
		firstName: ['',[
			Validators.required
		]],
		lastName: ['',[
			Validators.required
		]],
		email: ['', [
			Validators.required,
			Validators.email,
			Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
		]]
	});
	userid: string;
	code: string;

	get firstName() {
		return this.registerForm.get('firstName');
	}

	get lastName() {
		return this.registerForm.get('lastName');
	}

	get email() {
		return this.registerForm.get('email');
	}

  constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private valTrans: ValtransService
	) {
		this.activatedRoute.params.subscribe(params => {
			if(params['userid']) this.userid = params['userid'];
			if(params['code']) this.code = params['code'];
		});
	}

  ngOnInit(): void {
		if(this.userid && this.code) {
			Swal.fire('Espera...');
			Swal.showLoading();
			this.userService.emailValidate(
				this.userid,
				this.code
			).subscribe(response => {
				Swal.hideLoading();
				Swal.close();
				console.log(response);
				if(response.message && response.message === 'Cuenta validada') {
					this.file = true;
				}
			}, error => {
				Swal.hideLoading();
				Swal.close();
				// Swal.fire({
				// 	icon: 'error',
				// 	html: `<p>Tu cuenta ya fue validada previamente o no pudo ser validada<p>
				// 	<p>${error.message}</p>`
				// });
				this.router.navigate(['/pages/home']);
				console.log(error);
			});
		}
  }


	register() {
		this.valTrans.validateAllFormFields(this.registerForm);
		if(!this.registerForm.valid) {
			Swal.fire({
				icon: 'warning',
				html: `<p>Por favor, ingresa los campos necesarios</p>`
			});
			return;
		}
		Swal.fire('Espera...');
		Swal.showLoading();
		this.userService.register(
			this.valTrans.properCase(this.firstName.value),
			this.valTrans.properCase(this.lastName.value),
			this.email.value.toLowerCase(),
			THIS_URI
		).subscribe(() => {
			Swal.hideLoading();
			Swal.close();
			Swal.fire({
				icon: 'success',
				html: `<h3>Gracias</h3>
				<p>Hemos enviado a tu correo una liga para que puedas descargar tu obsequio</p>
				<p>Revisa en tu correo y de ser necesario busca en la bandeja de correos "No deseados" o "SPAM"</p>`
			});
		}, error => {
			Swal.hideLoading();
			Swal.close();
			// console.log(error.error.error);
			if(error.error && error.error.error === 'Usuario ya existe') {
				Swal.fire({
					icon: 'info',
					html: `<p>Ya te has registrado previamente. Muchas gracias.</p>
					<p>Descarga tu archivo</p>`
				});
				this.file = true;
				return;
			}
			Swal.fire({
				icon: 'error',
				html: `<h3>Hubo un error</h3>
				<p>Probablemente una falla temporal. Revisa los datos e intenta nuevamente.</p>
				<p><small>${error.message}</small></p>`
			});
			console.log(error);
		})
	}

}
