import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Media} from "../../interfaces/media";
import {ThemoviedbService} from "../../themoviedb.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-showing',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.scss']
})
export class ShowingComponent implements OnInit, OnChanges{
  @Input() media!: Observable<Media>;



  video!: string | null;
  image: string | undefined;

  constructor(private themoviedb: ThemoviedbService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['media'] && !changes['media'].firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit(): void {
    this.media.subscribe(media => {
      this.themoviedb.getMediaVideo(media.type, media.id.toString()).subscribe(video => {
        this.video = video?.key;
      });
      media.image?.backdrop ? this.image = 'https://image.tmdb.org/t/p/original' + media.image.backdrop : this.image = undefined;
    });
  }


}
