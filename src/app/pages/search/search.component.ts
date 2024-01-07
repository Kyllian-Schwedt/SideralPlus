import {Component, OnInit, HostListener, Input} from '@angular/core';
import {Media} from '../../interfaces/media';
import {ThemoviedbService} from "../../themoviedb.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {Type} from "../../interfaces/Type";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() type: Type = 'multi';
  medias: Media[] = [];
  protected query: string = '';
  protected queryUrl: string = '';
  private page: number = 1;
  protected loadingCards: number = 0;

  /**
   * Handle the query event from the search bar component
   * @param query
   */
  handleQueryEvent(query: string): void {
    this.medias = [];
    this.page = 1;
    this.queryMedia(query);
    this.query = query;
    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('/');
    let basePath = '/' + urlSegments[1];
    if (this.type !== 'multi') {
      basePath += '/' + urlSegments[2];
    }
    const encodedQuery = encodeURIComponent(query.split(' ').join('-'));
    history.replaceState(null, '', basePath + '/' + encodedQuery);
    console.log(this.query);
  }

  constructor(private themoviedbService: ThemoviedbService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(params => {
      // If there is a query in the url, we query the API to keep the query (example :  you want to share a search to a friend )
      if (params['query']) {
        const queryUrl = decodeURIComponent(params['query']);
        this.queryUrl = queryUrl.split('-').join(' ');
        this.queryMedia(this.queryUrl);
        this.query = this.queryUrl;
      }
    });
  }

  /**
   * Query medias from the API and append them to the medias array
   * @param query
   */
  queryMedia(query: string) {
    this.loadingCards = 2;
    this.themoviedbService.searchMediasByType(query, this.type, this.page).subscribe((medias: Media[]) => {
      this.medias = [...this.medias, ...medias];
      if (medias.length === 0) {
        console.log('No more medias ' + this.page + ' query: ' + query + ' type: ' + this.type);
        this.loadingCards = 0;
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.loadingCards === 0) return;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    let clientHeight = document.documentElement.clientHeight || window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.page++;
      this.queryMedia(this.query);
    }
  }
}

