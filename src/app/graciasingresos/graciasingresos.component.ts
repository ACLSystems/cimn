import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graciasingresos',
  templateUrl: './graciasingresos.component.html',
  styleUrls: ['./graciasingresos.component.scss']
})
export class GraciasingresosComponent implements OnInit {

	video: string = "https://www.youtube.com/embed/h8nCiLboIbk";
	auto: boolean = true;

  constructor() { }

  ngOnInit(): void {
		if(this.auto) this.video = this.video + '?autoplay=1';
  }

}
