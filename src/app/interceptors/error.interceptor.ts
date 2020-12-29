import {
	Injectable
} from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse
} from '@angular/common/http';
import {
	Observable,
	throwError
} from 'rxjs';
import {
	catchError
} from 'rxjs/operators';
import {
	ToastrService
} from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

	errorNow: boolean = true;

	constructor(
		public toastr: ToastrService
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request)
			.pipe(
				catchError((error:HttpErrorResponse) => {
					let errorMsg = '';
					let errorSide = '';
					let showError = true;
					console.log(error);
					if(error.error instanceof ErrorEvent) {
						console.log('Error de parte del cliente');
						errorMsg = `Error: ${error.error.message}`;
						errorSide = 'Error de usuario';
					} else {
						console.log('Error del servidor');
						if(error.status === 0) {
							errorMsg = `Error: El servidor no responde. Intenta más tarde`;
						} else if(error.status === 404) {
							if(error.url.includes('lastmainpublic')) showError = false;
						} else {
							errorMsg = `Error: ${error.message}`;
						}
						errorSide = 'Error del servidor';
					}
					if(this.errorNow && showError) this.toastr.error(errorMsg,errorSide);
					this.errorNow = false;
					return throwError(errorMsg);
				})
			)
	}
}
