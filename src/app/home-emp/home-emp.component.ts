import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-emp',
  templateUrl: './home-emp.component.html',
  styleUrls: ['./home-emp.component.scss']
})
export class HomeEmpComponent implements OnInit {

  constructor(
		private router: Router
	) { }

  ngOnInit(): void {
  }

	goCIMN() {
		this.router.navigate(['/home'])
	}
}
