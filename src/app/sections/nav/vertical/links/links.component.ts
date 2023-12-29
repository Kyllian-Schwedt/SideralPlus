import {Component, Input, OnInit} from '@angular/core';
import {Link} from "../../../../interfaces/link";

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  @Input() links: Link[] = [];

  isHovered: boolean = false;
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.links);
  }

  setHovered(isHovered: boolean) {
    this.isHovered = isHovered;
  }

}
