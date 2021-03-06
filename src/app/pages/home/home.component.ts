import {
	Component,
	OnInit,
	AfterViewInit
} from '@angular/core';
import {
	Router,
	ActivatedRoute,
	NavigationEnd
} from '@angular/router';
import {
	UserService
} from '@shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

	private fragment: string;
	blog: any;

  constructor(
		private router: Router,
		private route: ActivatedRoute,
		private readonly userService: UserService
	) {
		this.router.events.subscribe(s => {
			if(s instanceof NavigationEnd) {
				const tree = router.parseUrl(router.url);
				if(tree.fragment) {
					const element = document.querySelector("#" + tree.fragment);
					if(element) element.scrollIntoView(true);
				}
			}
		});
	}

  ngOnInit(): void {
		this.route.fragment.subscribe(fragment => {
			this.fragment = fragment;
		});
		this.getMainBlog();
  }

	ngAfterViewInit() {
		try {
			document.querySelector('#' + this.fragment).scrollIntoView();
		} catch (e) {}
	}

	goEmpAudaz() {
		this.router.navigate(['/empaudaz'])
	}

	getMainBlog() {
		this.userService.getMainPublicBlog().subscribe((data:any) => {
			console.log(data);
		}, error => {
			if(error.status !== 404) {
				console.log(error);
			}
		})
	}

}
