import { Component, OnInit, Input } from '@angular/core';
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
  measure: any;

  constructor(private themoviedb: ThemoviedbService) {
  }
  ngOnInit() {
    const type = this.media.type;
    const id = this.media.id;

    this.themoviedb.getMediaMeasure(type, id.toString()).subscribe(measure => {
      this.measure = measure;
    });
  }
}
