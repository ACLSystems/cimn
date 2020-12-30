import {
	Component,
	OnInit
} from '@angular/core';
import {
	ActivatedRoute
} from '@angular/router';
import {
	FormBuilder
} from '@angular/forms';
import {
	Quill
} from 'quill';
import Swal from 'sweetalert2';

import {
	BlogsService
} from '../blogs.service';
import {
	ToastrService
} from 'ngx-toastr';
import {
	Article,
	LogInfo,
	SupportingServices
} from '@shared';

declare const $:any;

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

	notNew: boolean = false;
	photos: string[] = [];
	photoSelected: string;
	photoId: string;
	article: Article;
	articleId: string;
	contentObject: any;
	charNum: number = 0;
	sending: boolean = false;
	message: string = 'Guardando...';
	editor: any;
	createdBy: any;
	createdAt: Date;
	updatedBy: any;
	updatedAt: Date;
	preurl: string;

	blogForm = this.fb.group({
		title: [''],
		description: [''],
		photo: [''],
		content: [''],
		main: [false]
	})

	constructor(
		private fb: FormBuilder,
		private blogsService: BlogsService,
		private activatedRoute: ActivatedRoute,
		private toastr: ToastrService,
		private support: SupportingServices
	) {
		this.activatedRoute.params.subscribe(params => {
			if(params['articleid']) this.articleId = params['articleid'];
		})
	}

	get title() {
		return this.blogForm.get('title');
	}

	get description() {
		return this.blogForm.get('description');
	}

	get photo() {
		return this.blogForm.get('photo');
	}

	get content() {
		return this.blogForm.get('content');
	}

	get main() {
		return this.blogForm.get('main');
	}

	ngOnInit(): void {
		if(this.articleId) {
			this.getArticle(this.articleId);
			this.preurl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/pages/blog/${this.articleId}`;
		}
		$(() => {
			$('[data-toggle="tooltip"]').tooltip();
			const tooltips = $('[data-toggle="tooltip"]');
			this.support.print('Tooltips',tooltips);
		});
	}

	copyMessage(){
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = this.preurl;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
		this.toastr.success(
			'Liga copiada','',{
				positionClass: 'toast-top-left'
			}
		);
	}

	getArticle(id:string) {
		Swal.fire('Espera...');
		Swal.showLoading();
		this.blogsService.getArticle(id).subscribe((res: Article) => {
			this.article = res;
			this.support.print('Article',this.article);
			this.notNew = true;
			if(this.article.title) {
				this.title.setValue(this.article.title);
				this.title.markAsDirty();
			}
			if(this.article.photo) this.getPhotoSelected(this.article.photo);
			if(this.article.description) {
				this.description.setValue(this.article.description);
				this.description.markAsDirty();
			}
			if(this.article.content) this.content.setValue(this.article.contentInnerHTML);
			if(this.article.main) this.main.setValue(this.article.main);
			if(this.article.logInfo) this.setLogInfo(this.article.logInfo)
			setTimeout(() => {
				Swal.hideLoading();
				Swal.close();
			},801);
		}, error => {
			Swal.hideLoading();
			Swal.close();
			console.log(error);
		});
	}

	getPhotos() {
		this.blogsService.getPhotos(
			this.photo.value,
			1,
			18
		).subscribe(data => {
			if(data.response?.results) {
				this.photos = data.response.results.map((result:any) => {
					return {
						url: result.urls.small,
						id: result.id
					};
				});
			}
		})
	}

	setConditionedLink() {
		if(!this.article.conditionedLink) this.article.conditionedLink = 'https://domain.com/link';
		if(!this.article.conditionedLinkTitle) this.article.conditionedLinkTitle = 'Obtén Archivo';
		Swal.fire({
			icon: 'question',
			title: 'Liga condicionada',
			html: `
				<p>La siguiente liga estará condicionada a que el usuario se registre o esté ya registrado con una cuenta de correo válida<p>
				<h6>Frase para descarga en botón</h6>
				<input id="conditionedLinkTitle" class="form-group" type="text" value="${this.article.conditionedLinkTitle}" style="width: 100%;">
				<h6>Liga</h6>
				<input id="conditionedLink" class="form-group" type="text" value="${this.article.conditionedLink}" style="width: 100%;">
			`,
			showCancelButton: true,
			confirmButtonText: 'Listo',
			cancelButtonText: 'Cancelar',
			customClass: {
				confirmButton: 'btn btn-success btn-block',
				cancelButton: 'btn btn-danger btn-block'
			}
		}).then((result) => {
			if(result.isConfirmed) {
				this.article.conditionedLinkTitle = $('#conditionedLinkTitle').val();
				this.article.conditionedLink = $('#conditionedLink').val();
				this.support.print('Conditioned Article',this.article);
				// this.getAndSetArticle();
			}
		});
	}

	getPhotoSelected(photoid:string) {
		this.photoId = photoid;
		this.blogsService.getPhoto(
			photoid
		).subscribe((data:any) => {
			if(data.response && data.response.urls) {
				this.photoSelected = data.response.urls.regular;
			}
		});
	}

	getContents(editor: Quill) {
		this.contentObject = JSON.parse(JSON.stringify(editor.editor.getContents().ops));
		this.getAndSetArticle();
	}

	getAndSetArticle(){
		const article = {
			title: this.title.value,
			description: this.description.value,
			photo: this.photoId,
			content: this.contentObject || this.content.value,
			contentInnerHTML: this.content.value,
			main: this.main.value,
			public: this.article.public,
			hide: this.article.hide,
			draft: this.article.draft
		}
		this.sending = true;
		this.support.print('Sending Article',article);
		this.blogsService.sendArticle(
			article,
			this.articleId
		).subscribe((res:any) => {
			this.support.print('Article response',res);
			this.notNew = true;
			if(res._id) {
				this.articleId = res._id;
				this.article = res;
			}
			if(res.logInfo) this.setLogInfo(res.logInfo);
			this.sending = false;
			this.toastr.success(
				'Artículo guardado',
				'',
				{
					positionClass: 'toast-top-left'
				}
			)
		}, error => {
			console.log(error);
			this.message = 'Error al guardar!!';
			setTimeout(() => {
				this.sending = false;
			},8);
		});
	}

	toggleMain() {
		this.main.setValue(!this.main.value);
		this.article.main = !this.article.main;
		this.getAndSetArticle();
	}

	toggleHide() {
		this.article.hide = !this.article.hide;
		this.getAndSetArticle();
	}

	publish() {
		if(!this.notNew) return;
		this.article.draft = false;
		this.getAndSetArticle();
	}

	public() {
		if(!this.notNew) return;
		this.article.public = !this.article.public;
		this.getAndSetArticle();
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

}
