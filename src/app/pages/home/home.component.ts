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
	UserService,
	SupportingServices
} from '@shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

	private fragment: string;
	blogs: any[];
	loading: boolean = false;

  constructor(
		private router: Router,
		private route: ActivatedRoute,
		private readonly userService: UserService,
		private readonly support: SupportingServices
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
		this.loading = true;
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
			this.blogs = [...data];
			this.support.print('Blogs',this.blogs);
			this.loading = false;
		}, error => {
			if(error.status !== 404) {
				console.log(error);
			}
		})
	}

	viewBlog(articleid: string) {
		this.router.navigate(['/pages/blog',articleid]);
	}

}
