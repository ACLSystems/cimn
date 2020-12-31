import {
	Component,
	OnInit
} from '@angular/core';
import {
	ActivatedRoute,
	Router
} from '@angular/router';
import Swal from 'sweetalert2';
import {
	Article,
	LogInfo,
	UserService
} from '@shared';

declare const $:any;

@Component({
	selector: 'pages-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

	articleId: string;
	title: string;
	description: string;
	photoId: string;
	photo: string;
	photoUser: any;
	content: string;
	createdAt: Date;
	createdBy: string;
	updatedAt: Date;
	updatedBy: string;
	loading: boolean = false;
	applauses: string = 'No hay aplausos';
	responses: string = 'No hay comentarios';
	email: string;

	constructor(
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		private router: Router
	) {
		this.activatedRoute.params.subscribe(params => {
			if(params['articleid']) this.articleId = params['articleid'];
		})
	}

	ngOnInit(): void {
		this.email = this.userService.getEmail();
		if(this.articleId) {
			this.getArticle(this.articleId);
		} else {
			this.router.navigate(['/pages/home']);
		}
		$(function () {
			$('[data-toggle="tooltip"]').tooltip()
		})
	}

	getArticle(id:string) {
		Swal.fire('Cargando. Espera un momento...');
		Swal.showLoading();
		this.userService.getArticle(id).subscribe((res: Article) => {
			const article = res;
			console.group('Article');
			console.log(article);
			console.groupEnd();
			const applauses = article.likes.length;
			if(applauses === 1) {
				this.applauses = 'Un aplauso';
			}
			if(applauses > 1) {
				this.applauses = `${applauses} aplausos`;
			}
			const comments = article.comments.length;
			if(comments === 1) {
				this.responses = 'Un comentario';
			}
			if(comments > 1) {
				this.responses = `${comments} comentarios`;
			}
			if(article.title) {
				this.title = article.title;
			}
			if(article.photo) this.getPhotoSelected(article.photo);
			if(article.description) {
				this.description = article.description;
			}
			if(article.content) this.content = article.contentInnerHTML;
			if(article.logInfo) this.setLogInfo(article.logInfo);
			setTimeout(() => {
				const videos = $('iframe.ql-video');
				videos.attr("width","854");
				videos.attr("height","480");
				// console.group('Videos');
				// console.log(videos);
				// console.groupEnd();
				Swal.hideLoading();
				Swal.close();
			}, 800);
		}, error => {
			Swal.hideLoading();
			Swal.close();
			if(!error.status) {
				Swal.fire({
					'icon': 'error',
					html: `
					<p>El servidor no responde en este momento</p>
					<p>Probablemente es temporal</p>
					<p>Por favor intenta nuevamente más tarde</p>
					`
				})
			}
			Swal.fire({
				icon: 'error',
				html: `<p>Hubo un error al descargar el artículo</p>
				<p>${error.message}</p>`
			});
			console.log(error);
			this.router.navigate(['/pages/home']);
		});
	}

	getPhotoSelected(photoid:string) {
		this.photoId = photoid;
		this.userService.getPhoto(
			photoid
		).subscribe((data:any) => {
			// console.group('Photo');
			// console.log(data);
			// console.groupEnd();
			if(data.response && data.response.urls) {
				this.photo = data.response.urls.regular;
				if(data.response.user)
				this.photoUser = data.response.user;
				// console.group('Photo User');
				// console.log(this.photoUser);
				// console.groupEnd();
			}
		});
	}

	setLogInfo(logInfo:LogInfo) {
		if(!logInfo) return;
		if(logInfo.createdAt) this.createdAt = new Date(logInfo.createdAt);
		if(logInfo.createdBy?.firstName)
			this.createdBy =
			`${logInfo.createdBy.firstName} ${logInfo.createdBy.lastName}`;
		if(logInfo.logHistory &&
			logInfo.logHistory.length > 0)
			this.updatedAt = new Date(logInfo.logHistory[0].updatedAt);
		if(logInfo.logHistory && logInfo.logHistory.length > 0 && logInfo.logHistory[0].updatedBy?.firstName) this.updatedBy =
		`${logInfo.logHistory[0].updatedBy.firstName} ${logInfo.logHistory[0].updatedBy.lastName}` ;
	}

	applause() {
		if(!this.email) {
			$('#applause').tooltip('hide');
			this.router.navigate(['/pages/register'],{
				state: {
					origin: 'blog',
					blogid: this.articleId
				}
			});
		}
	}

}
