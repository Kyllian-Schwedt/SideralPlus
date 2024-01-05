import { Component, Input } from '@angular/core';
import { Media } from '../../interfaces/media';

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.scss']
})
export class CardsGridComponent {
  @Input() name!: string;
  @Input() medias!: Media[];
  @Input() isOnlyGrid: boolean = true;
  @Input() loadingCards: number = 0;
}
