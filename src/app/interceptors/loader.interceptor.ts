import {
	Injectable
} from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import {
	Observable
} from 'rxjs';
// import {
// 	delay,
// 	finalize
// } from 'rxjs/operators';
// import {
// 	NgxSpinnerService
// } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	constructor(
		// public spinner: NgxSpinnerService
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				'Content-Type':'application/json'
			}
		});

		// this.spinner.show();
		// console.log('En el loader Interceptor')

		// return next.handle(request).pipe(
		// 	delay(5400),
		// 	finalize(() => this.spinner.hide())
		// );

		return next.handle(request);
	}
}
