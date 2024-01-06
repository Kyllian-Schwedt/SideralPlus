import {Component} from '@angular/core';
import {Media} from "../../interfaces/media";
import {UserStorageService} from "../../user-storage.service";
import {User} from "../../interfaces/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent {
  user: User | null = null;
  medias: Observable<Media[]>;
  currentSelectedMedia: Media | null = null;
  selectedMedia: Observable<Media> = new Observable<Media>();

  constructor(private userStorageService: UserStorageService) {
    this.user = this.userStorageService.getCurrentUser();
    this.medias = new Observable<Media[]>(subscriber => {
      if (this.user) {
        subscriber.next(this.user.watch_list.movies);
      }
    });
    this.currentSelectedMedia = null;
  }

  ngOnInit(): void {
    if (this.user) {
    }
  }

  onMediaSelected(media: Media): void {
    this.currentSelectedMedia = media;
    this.selectedMedia = new Observable<Media>(subscriber => {
      subscriber.next(media);
    });
  }

  onMediaListChanged(media: Media): void {
    this.medias = new Observable<Media[]>(subscriber => {
      this.user = this.userStorageService.getCurrentUser();
      if (this.user) {
        subscriber.next(this.user.watch_list.movies);
        const randMedia = this.user.watch_list.movies[Math.floor(Math.random() * this.user.watch_list.movies.length)];
        this.selectedMedia = new Observable<Media>(subscriber => {
          subscriber.next(randMedia);
        });
      }
    });
  }


}
