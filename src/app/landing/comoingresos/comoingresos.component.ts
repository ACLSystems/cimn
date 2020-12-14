import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-comoingresos',
  templateUrl: './comoingresos.component.html',
  styleUrls: ['./comoingresos.component.scss']
})

export class ComoingresosComponent implements OnInit, OnDestroy, AfterViewInit {

	private updateSubscription: Subscription;
	dueDate: Date;
	diff: number;
	displayDueDate: string;
	fdDay: number;
	sdDay: number;
	fdHour: number;
	sdHour: number;
	fdMin: number;
	sdMin: number;
	fdSec: number;
	sdSec: number;
	video: string = "https://www.youtube.com/embed/KcymAMFA-rw";
	auto: boolean = true;

	constructor() {
		this.dueDate = new Date('2020-11-06 19:00');
	}

	ngOnInit(): void {

		this.updateSubscription = interval(1000).subscribe(() => {
			const now = new Date();
			this.diff = (this.dueDate.getTime() - now.getTime()) / 1000;
			// console.log('Refresh');
			// console.log(diff);
			const daysSeconds = 24 * 60 * 60;
			const days = Math.floor(this.diff / daysSeconds);
			var diffSeconds = this.diff - (daysSeconds * days);
			// console.log(diffSeconds);
			const hourSeconds = 60 * 60;
			const hours = Math.floor(diffSeconds / hourSeconds);
			diffSeconds = diffSeconds - (hourSeconds * hours);
			// console.log(diffSeconds);
			const minSeconds = 60;
			const mins = Math.floor(diffSeconds / minSeconds);
			diffSeconds = Math.floor(diffSeconds - (minSeconds * mins));
			// console.log(diffSeconds);
			this.displayDueDate = `${days} días ${hours} hrs ${mins} mins ${diffSeconds} segs`
			this.fdDay = Math.floor(days/10);
			this.sdDay = Math.floor(days%10);
			this.fdHour = Math.floor(hours/10);
			this.sdHour = Math.floor(hours%10);
			this.fdMin = Math.floor(mins/10);
			this.sdMin = Math.floor(mins%10);
			this.fdSec = Math.floor(diffSeconds/10);
			this.sdSec = diffSeconds - (this.fdSec * 10);
		});

		// let videoPlayer: any = document.getElementById('vid');
		// let promise = videoPlayer.play();
		// if(promise === undefined){
		// 	this.showPlay = true;
		// }

		if(this.auto) this.video = this.video + '?autoplay=1';
	}

	ngAfterViewInit() {

	}

	ngOnDestroy(): void {
		this.updateSubscription.unsubscribe();
	}

}
