import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	year: number;

  constructor() {
		const now = new Date();
		this.year = now.getFullYear();
	}

  ngOnInit(): void {
  }

}