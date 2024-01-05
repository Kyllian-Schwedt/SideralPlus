import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Media} from '../../interfaces/media';
import {ThemoviedbService} from "../../themoviedb.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-content-showing',
  templateUrl: './content-showing.component.html',
  styleUrls: ['./content-showing.component.scss']
})
export class ContentShowingComponent implements OnInit, OnChanges {
  @Input() media!: Observable<Media>;
  @Input() isMediaSelected!: boolean;
  mediaRes: Media | undefined;
  logo: any;
  measure: any;
  language: any;

  constructor(private themoviedb: ThemoviedbService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['media'] && !changes['media'].firstChange) {
        this.ngOnInit()
      }
    }

ngOnInit() {
  this.media.subscribe(media => {
    this.mediaRes = media;
    const type = media.type;
    const id = media.id;
    this.language = media.language;

    this.themoviedb.getMediaLogo(type, id.toString()).subscribe(logo => {
      this.logo = logo;
    });

    this.themoviedb.getMediaMeasure(type, id.toString()).subscribe(measure => {
      this.measure = measure;
    });
  });
}

  convertLanguage(language: string) {
    //TODO implement language conversion
  }

  humanizeRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }
}
