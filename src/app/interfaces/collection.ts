import {Observable} from "rxjs";
import {Media} from "./media";

export interface Collection {
  id: number;
  title: string;
  medias: Observable<Media[]>
  path?: string;
}
