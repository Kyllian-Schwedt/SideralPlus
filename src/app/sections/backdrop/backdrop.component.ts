import {Component, Input} from '@angular/core';
import {Image} from "../../interfaces/image";

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent {
  @Input() src?: string;

}
