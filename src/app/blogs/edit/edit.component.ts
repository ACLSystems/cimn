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
	Article,
	LogInfo
} from './article.type';

declare const $:any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

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

	blogForm = this.fb.group({
		title: [''],
		description: [''],
		photo: [''],
		content: [''],
		main: [false],
		validateEmail: [false]
	})

	constructor(
		private fb: FormBuilder,
		private blogsService: BlogsService,
		private activatedRoute: ActivatedRoute
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

	get validateEmail() {
		return this.blogForm.get('validateEmail');
	}

	ngOnInit(): void {
		if(this.articleId) {
			Swal.fire('Espera...');
			Swal.showLoading();
			this.getArticle(this.articleId);
		}
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
	}

	getArticle(id:string) {
		this.blogsService.getArticle(id).subscribe((res: Article) => {
			this.article = res;
			console.log(this.article);
			if(this.article.title) this.title.setValue(this.article.title);
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
			Swal.fire({
				icon: 'error',
				html: `<p>Hubo un error al descargar el artículo</p>
				<p>${error.message}</p>`
			});
		});
	}

	getPhotos() {
		this.blogsService.getPhotos(
			this.photo.value,
			1,
			18
		).subscribe(data => {
			if(data.response?.results) {
				// console.log(data.response);
				this.photos = data.response.results.map((result:any) => {
					return {
						url: result.urls.small,
						id: result.id
					};
				});
			}
		})
	}


	getPhotoSelected(photoid:string) {
		this.photoId = photoid;
		this.blogsService.getPhoto(
			photoid
		).subscribe((data:any) => {
			// console.log(data);
			if(data.response && data.response.urls) {
				this.photoSelected = data.response.urls.regular;
				// console.log(this.photoSelected);
			}
		});
	}

	getAndSetArticle(editor: Quill){
		this.contentObject = JSON.parse(JSON.stringify(editor.editor.getContents().ops));
		// console.log(this.contentObject);
		this.article = {
			title: this.title.value,
			description: this.description.value,
			photo: this.photoId,
			content: this.contentObject,
			contentInnerHTML: this.content.value,
			main: this.main.value
		}
		this.sending = true;
		this.blogsService.sendArticle(
			this.article,
			this.articleId
		).subscribe((res:any) => {
			console.group('Article');
			console.log(res);
			console.groupEnd();
			if(res._id) this.articleId = res._id;
			if(res.logInfo) this.setLogInfo(res.logInfo);
			this.sending = false;
		}, error => {
			console.log(error);
			this.message = 'Error al guardar!!';
			setTimeout(() => {
				this.sending = false;
			},8);
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
			this.updatedAt = new Date(logInfo.logHistory[logInfo.logHistory.length - 1].updatedAt);
		if(logInfo.logHistory && logInfo.logHistory.length > 0 && logInfo.logHistory[logInfo.logHistory.length - 1].updatedBy?.firstName) this.updatedBy =
		`${logInfo.logHistory[logInfo.logHistory.length - 1].updatedBy.firstName} ${logInfo.logHistory[logInfo.logHistory.length - 1].updatedBy.lastName}` ;
	}

}
