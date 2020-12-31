import {
	Component,
	OnInit,
	Input
} from '@angular/core';

import {
	Article
} from '@shared';

@Component({
  selector: 'blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

	@Input() blog: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
