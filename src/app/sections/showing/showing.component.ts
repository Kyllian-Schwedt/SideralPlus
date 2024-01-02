import {Component, Input, OnInit} from '@angular/core';
import {Media} from "../../interfaces/media";
import {ThemoviedbService} from "../../themoviedb.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-showing',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.scss']
})
export class ShowingComponent implements OnInit{
  @Input() media!: Observable<Media>;



  video: string | undefined;
  image: string | undefined;

  constructor(private themoviedb: ThemoviedbService) {
  }

  ngOnInit(): void {
    this.media.subscribe(media => {
      this.themoviedb.getMediaVideo(media.type, media.id.toString()).subscribe(video => {
        this.video = video.key;
      });
      media.image?.backdrop ? this.image = 'https://image.tmdb.org/t/p/original' + media.image.backdrop : this.image = undefined;
    });
  }


}
