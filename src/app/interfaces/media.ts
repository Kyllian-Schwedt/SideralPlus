import {Image} from "./image";
import {Video} from "./video";
import {Lang} from "./lang";

export interface Media {
  id: number;
  title: string;
  isForAdult: boolean;
  type: "movie" | "tv";
  image?: Image;
  overview: string;
  releasedAt?: string;
  video?: Video;
  language?: Lang;
}
