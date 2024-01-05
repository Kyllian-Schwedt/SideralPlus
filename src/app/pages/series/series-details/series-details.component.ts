import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Media} from "../../../interfaces/media";
import {Cast} from "../../../interfaces/cast";
import {ActivatedRoute} from "@angular/router";
import {ThemoviedbService} from "../../../themoviedb.service";
import {Season} from "../../../interfaces/season";

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.scss']
})
export class SeriesDetailsComponent implements OnInit {
  id!: string;
  spotlightMedia!: Observable<Media>;
  similarMedias!: Observable<Media[]>;
  castList!: Observable<Cast[]>;
  seasons!: Observable<Season[]>;

  constructor(private route: ActivatedRoute, private themoviedbService: ThemoviedbService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.updateContent();
    });
  }

  updateContent(): void {
    this.spotlightMedia = this.themoviedbService.getMediaDetails("tv", this.id);
    this.similarMedias = this.themoviedbService.getSimilarMedias("tv", this.id, 1 );
    this.castList = this.themoviedbService.getMediaCast("tv", this.id, 1);
    this.seasons = this.themoviedbService.getSeasons(this.id);
  }
}
