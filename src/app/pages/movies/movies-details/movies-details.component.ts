import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ThemoviedbService} from "../../../themoviedb.service";
import {Observable} from "rxjs";
import {Media} from "../../../interfaces/media";
import {Cast} from "../../../interfaces/cast";

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent implements OnInit {
  id!: string;
  spotlightMedia!: Observable<Media>;
  similarMedias!: Observable<Media[]>;
  castList!: Observable<Cast[]>;

  constructor(private route: ActivatedRoute, private themoviedbService: ThemoviedbService) {
  }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.id = params['id'];
    this.updateContent();
  });
}

updateContent(): void {
  this.spotlightMedia = this.themoviedbService.getMediaDetails("movie", this.id);
  this.similarMedias = this.themoviedbService.getSimilarMedias("movie", this.id, 1 );
  this.castList = this.themoviedbService.getMediaCast("movie", this.id);
}
}
