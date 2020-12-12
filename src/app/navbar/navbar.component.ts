import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	roles: any;
	token: string;

  constructor(
		private router: Router
	) { }

  ngOnInit(): void {
		const $dropdown = $(".dropdown");
		const $dropdownToggle = $(".dropdown-toggle");
		const $dropdownMenu = $(".dropdown-menu");
		const showClass = "show";

		$(window).on("load resize", function() {
		  if (this.matchMedia("(min-width: 768px)").matches) {
		    $dropdown.hover(
		      function() {
		        const $this = $(this);
		        $this.addClass(showClass);
		        $this.find($dropdownToggle).attr("aria-expanded", "true");
		        $this.find($dropdownMenu).addClass(showClass);
		      },
		      function() {
		        const $this = $(this);
		        $this.removeClass(showClass);
		        $this.find($dropdownToggle).attr("aria-expanded", "false");
		        $this.find($dropdownMenu).removeClass(showClass);
		      }
		    );
		  } else {
		    $dropdown.off("mouseenter mouseleave");
		  }
		});

		this.getRoles();
  }

	getRoles(){
		this.roles = JSON.parse(localStorage.getItem('roles'));
		this.token = localStorage.getItem('token');
	}

}
