import {Component, Injectable, Input} from '@angular/core';
import {Link} from "../../../../interfaces/link";
import {faNotdef} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})

export class LinkComponent {
  @Input() link: Link = {name: '', path: '', icon: faNotdef, childLinks: [], isCurrent: false};
  @Input() isHovered: boolean = false;

  constructor() {
  }
}
