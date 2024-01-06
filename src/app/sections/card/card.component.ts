import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Media } from "../../interfaces/media";
import {ThemoviedbService} from "../../themoviedb.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() media!: Media;
  @Input() isGrid: boolean = false;
  @Input() isVoidCardLoading: boolean = false;
  @Input() preventLink: boolean = false;
  @Output() onClick = new EventEmitter<Media>();
  measure: any;

  constructor(private themoviedb: ThemoviedbService) {
  }
  ngOnInit() {
    if(this.isVoidCardLoading) return;
    const type = this.media.type;
    const id = this.media.id;

    if(this.isGrid && this.media) {
      this.themoviedb.getMediaMeasure(type, id.toString()).subscribe(measure => {
        this.measure = measure;
      });
    }
  }

  humanizeRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }

  emitClick($event: MouseEvent) {
      this.onClick.emit(this.media);
    }
}
