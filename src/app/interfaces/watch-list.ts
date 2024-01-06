import {Media} from "./media";

export interface WatchList {
  id: number;
  user_id: number;
  movies: Media[];
  created_at: string;
  updated_at: string;
}
