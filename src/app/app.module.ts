import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerticalComponent } from './sections/nav/vertical/vertical.component';
import { LinksComponent } from './sections/nav/vertical/links/links.component';
import { LinkComponent } from './sections/nav/vertical/link/link.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { ShowingComponent } from './sections/showing/showing.component';
import { PlaybackComponent } from './sections/playback/playback.component';
import { BackdropComponent } from './sections/backdrop/backdrop.component';
import { HttpClientModule } from '@angular/common/http';
import {YouTubePlayerModule} from "@angular/youtube-player";
import { ContentComponent } from './sections/content/content.component';
import { ContentShowingComponent } from './sections/content-showing/content-showing.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgOptimizedImage} from "@angular/common";
import { ButtonComponent } from './utils/button/button.component';
import { CardComponent } from './sections/card/card.component';
import { CardsComponent } from './sections/cards/cards.component';
import {DragScrollComponent, DragScrollItemDirective} from "ngx-drag-scroll";
import { SearchComponent } from './pages/search/search.component';
import { SearchbarComponent } from './sections/searchbar/searchbar.component';
import { CardsGridComponent } from './sections/cards-grid/cards-grid.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoadingCardComponent } from './sections/card/loading-card/loading-card.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MoviesDetailsComponent } from './pages/movies/movies-details/movies-details.component';
import { SeriesComponent } from './pages/series/series.component';
import { CastComponent } from './sections/cast/cast.component';
import { CastsComponent } from './sections/casts/casts.component';
import { SeriesDetailsComponent } from './pages/series/series-details/series-details.component';

@NgModule({
  declarations: [
    AppComponent,
    VerticalComponent,
    LinksComponent,
    LinkComponent,
    HomeComponent,
    ShowingComponent,
    PlaybackComponent,
    BackdropComponent,
    ContentComponent,
    ContentShowingComponent,
    ButtonComponent,
    CardComponent,
    CardsComponent,
    SearchComponent,
    SearchbarComponent,
    CardsGridComponent,
    LoadingCardComponent,
    MoviesComponent,
    MoviesDetailsComponent,
    SeriesComponent,
    CastComponent,
    CastsComponent,
    CastsComponent,
    SeriesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    YouTubePlayerModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    DragScrollComponent,
    DragScrollItemDirective,
    FormsModule,
    ReactiveFormsModule,
    HammerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
