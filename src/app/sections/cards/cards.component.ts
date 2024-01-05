import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DragScrollComponent} from "ngx-drag-scroll";
import {Observable} from "rxjs";
import {Media} from "../../interfaces/media";
import {faArrowAltCircleRight, faChevronRight, faList} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnChanges {
  @ViewChild('nav', {read: DragScrollComponent, static: true}) ds: DragScrollComponent | undefined;
  @Input() Medias!: Observable<Media[]>;
  @Input() name: string = '';
  @Input() pathCollection?: string;

  reachesRightBound: boolean = false;
  reachesLeftBound: boolean = false;

  onReachesLeftBound(event: boolean): void {
    this.reachesLeftBound = event;
  }

  onReachesRightBound(event: boolean): void {
    this.reachesRightBound = event;
  }


  mediaList: Media[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Medias'] && !changes['Medias'].firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit(): void {
    this.Medias.subscribe(media => {
      this.mediaList = media;
      console.log(this.mediaList);
    });
    }

  scrollToLeft(): void {
    if(!this.ds) return;
    const decr = this.ds.currIndex > 3 ? 3 : this.ds.currIndex;
    this.ds?.moveTo(this.ds.currIndex - decr);
  }

  scrollToRight(): void {
    //set incr var to 3 if there are 3 cards left, else set incr var to the number of cards left
    if(!this.ds) return;
    const incr = this.mediaList.length - this.ds.currIndex > 3 ? 3 : (this.mediaList.length-1) - this.ds.currIndex;
    this.ds?.moveTo(this.ds.currIndex + incr);
  }

  protected readonly faChevronRight = faChevronRight;
  protected readonly faList = faList;
  protected readonly faArrowAltCircleRight = faArrowAltCircleRight;
  isScrollHidden: boolean = true;
}
