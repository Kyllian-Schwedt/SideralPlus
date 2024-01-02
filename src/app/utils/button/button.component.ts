import { Component, EventEmitter, Input, Output } from '@angular/core';
import {faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";

interface Variant {
  name: 'primary' | 'secondary';
  type?: 'watch' | 'save';
  isInverted?: boolean;
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant!: Variant;
  @Input() isFull?: boolean;
  @Output() onClick = new EventEmitter<void>();
  protected readonly faPlay = faPlay;
  protected readonly faPlus = faPlus;
}
