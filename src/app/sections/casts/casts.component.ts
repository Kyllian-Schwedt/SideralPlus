import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DragScrollComponent } from "ngx-drag-scroll";
import { Observable } from "rxjs";
import { Cast } from "../../interfaces/cast";
import { faArrowAltCircleRight, faChevronRight, faList } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-casts',
  templateUrl: './casts.component.html',
  styleUrls: ['./casts.component.scss']
})
export class CastsComponent implements OnInit, OnChanges {
  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent | undefined;
  @Input() Casts!: Observable<Cast[]>;
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

  castList: Cast[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Casts'] && !changes['Casts'].firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit(): void {
    this.Casts.subscribe(cast => {
      this.castList = cast;
      console.log(this.castList);
    });
  }

  scrollToLeft(): void {
    if(!this.ds) return;
    const decr = this.ds.currIndex > 3 ? 3 : this.ds.currIndex;
    this.ds?.moveTo(this.ds.currIndex - decr);
  }

  scrollToRight(): void {
    if(!this.ds) return;
    const incr = this.castList.length - this.ds.currIndex > 3 ? 3 : (this.castList.length-1) - this.ds.currIndex;
    this.ds?.moveTo(this.ds.currIndex + incr);
  }

  protected readonly faChevronRight = faChevronRight;
  protected readonly faList = faList;
  protected readonly faArrowAltCircleRight = faArrowAltCircleRight;
}
