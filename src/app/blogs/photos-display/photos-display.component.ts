import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';

@Component({
  selector: 'blog-photos-display',
  templateUrl: './photos-display.component.html',
  styleUrls: ['./photos-display.component.scss']
})
export class PhotosDisplayComponent implements OnInit {

	@Input() photos: string[];
	@Output() photoSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
		// console.log('Estamos en fotos');
		// console.log(this.photos);
  }

	selection(id:string) {
		this.photoSelected.emit(id);
	}

}
