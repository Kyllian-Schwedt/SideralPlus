import {Component, OnInit} from '@angular/core';
import {Media} from "../../interfaces/media";
import {ThemoviedbService} from "../../themoviedb.service";
import {Observable} from "rxjs";
import {DataService} from "../../data.service";
import {Collection} from "../../interfaces/collection";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  spotLightMedia: Observable<Media>;
  protected collections: Collection[] = [];

  constructor(private themoviedb: ThemoviedbService, private data: DataService) {
    this.spotLightMedia = this.themoviedb.getMediaSpotlight("all");
    this.collections = this.data.getHomeCollections();
  }

  ngOnInit() {
    this.spotLightMedia.subscribe(media => {
      console.log(media);
    });
  }

}
