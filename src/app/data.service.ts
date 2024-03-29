import { Injectable } from '@angular/core';
import {ThemoviedbService} from "./themoviedb.service";
import {Collection} from "./interfaces/collection";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private themoviedb: ThemoviedbService) { }

  getHomeCollections(): Collection[] {
    return [
      {
        id: 1,
        title: 'Trending',
        medias: this.themoviedb.getTrendingMedias("all", "week")
      },
      {
        id: 2,
        title: 'Films',
        medias: this.themoviedb.getGroupMedias("popular", "movie", 1),
        path: '/discover/movies'
      },
      {
        id: 3,
        title: 'Series',
        medias: this.themoviedb.getGroupMedias("popular", "tv", 1),
        path: 'discover/series'
      }
    ];
  }

}
