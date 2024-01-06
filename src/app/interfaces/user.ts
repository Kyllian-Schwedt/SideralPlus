import {WatchList} from "./watch-list";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  watch_list: WatchList;
  created_at: string;
  updated_at: string;
}
