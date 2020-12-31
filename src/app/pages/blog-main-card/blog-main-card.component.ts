import {
	Component,
	OnInit,
	Input
} from '@angular/core';

import {
	Article
} from '@shared';

@Component({
  selector: 'blog-main-card',
  templateUrl: './blog-main-card.component.html',
  styleUrls: ['./blog-main-card.component.scss']
})
export class BlogMainCardComponent implements OnInit {

	@Input() blog: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
