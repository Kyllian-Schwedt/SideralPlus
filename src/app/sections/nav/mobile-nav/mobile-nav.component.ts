import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Link} from "../../../interfaces/link";
import {faFilm, faHouse, faList, faSearch, faTv, faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent {
  links: Link[] = [
    //profile, home, search, series, movies, my list

    {name: 'Profile', path: '/profile', icon: faUser, childLinks: [], isCurrent: false},
    {name: 'Home', path: '/', icon: faHouse, childLinks: [], isCurrent: false},
    {name: 'Search', path: '/search', icon: faSearch, childLinks: [], isCurrent: false},
    {name: 'Series', path: '/discover/series', icon: faTv, childLinks: [], isCurrent: false},
    {name: 'Movies', path: '/discover/movies', icon: faFilm, childLinks: [], isCurrent: false},
    {name: 'My List', path: '/my-list', icon: faList, childLinks: [], isCurrent: false}
  ]

  constructor(private router: Router) {}

  isActive(href: string): boolean {
    return this.router.url === href;
  }
}
