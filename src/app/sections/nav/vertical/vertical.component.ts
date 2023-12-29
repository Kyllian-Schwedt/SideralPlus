import { Component } from '@angular/core';
import {faFilm, faHouse, faList, faNotdef, faSearch, faTv, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "../../../interfaces/link";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class VerticalComponent {

  //create list links
  links: Link[] = [
    //profile, home, search, series, movies, my list

    {name: 'Profile', path: '/profile', icon: faUser, childLinks: [], isCurrent: false},
    {name: 'Home', path: '/home', icon: faHouse, childLinks: [], isCurrent: false},
    {name: 'Search', path: '/search', icon: faSearch, childLinks: [], isCurrent: false},
    {name: 'Series', path: '/series', icon: faTv, childLinks: [], isCurrent: false},
    {name: 'Movies', path: '/movies', icon: faFilm, childLinks: [], isCurrent: false},
    {name: 'My List', path: '/my-list', icon: faList, childLinks: [], isCurrent: false}
  ]

  isHovered: boolean = false;


  constructor(private route: ActivatedRoute) {

    this.links.forEach(link => {
      link.isCurrent = link.path === "/"+route.snapshot.url[0].path;
    })
    console.log(this.links);
    console.log(route.snapshot.url[0].path);

  }




}
