import {Component, Input} from '@angular/core';
import {Cast} from "../../interfaces/cast";

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent {
  @Input() cast!: Cast;

}
