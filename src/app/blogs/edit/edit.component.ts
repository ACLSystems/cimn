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
	Article
} from './article.type';

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

	ngOnInit(): void {
		if(this.articleId) {
			Swal.fire('Espera...');
			Swal.showLoading();
			this.getArticle(this.articleId);
		}
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
		console.log(this.contentObject);
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
		).subscribe(() => {
			// console.log(data);
			this.sending = false;
		}, error => {
			console.log(error);
			this.message = 'Error al guardar!!';
			setTimeout(() => {
				this.sending = false;
			},8);
		});
	}

}
