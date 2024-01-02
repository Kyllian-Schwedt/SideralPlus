import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import { HostListener } from '@angular/core';
import {YouTubePlayer} from "@angular/youtube-player";

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent implements AfterViewInit, OnDestroy{
  @Input() videoId: string = '';
  @ViewChild(YouTubePlayer, { static: false }) youtubePlayer!: YouTubePlayer;
  private intervalId?: number;

  constructor(){}

  ngAfterViewInit() {
    this.youtubePlayer.mute();
    this.intervalId = window.setInterval(() => {
      const currentTime = this.youtubePlayer.getCurrentTime();
      const duration = this.youtubePlayer.getDuration();
      if (duration - currentTime <= 15) {
        this.youtubePlayer.seekTo(0, true);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}
