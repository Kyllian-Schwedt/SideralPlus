import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() type: ContentType = 'primary';
  @Input() isSpacer: boolean = false;

  constructor() {
  }



}

export type ContentType = 'primary' | 'secondary';
