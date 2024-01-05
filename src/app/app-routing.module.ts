import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SearchComponent} from "./pages/search/search.component";
import {MoviesDetailsComponent} from "./pages/movies/movies-details/movies-details.component";
import {SeriesDetailsComponent} from "./pages/series/series-details/series-details.component";
import {SeriesComponent} from "./pages/series/series.component";
import {MoviesComponent} from "./pages/movies/movies.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:query', component: SearchComponent},
  {path: 'movies/:id', component: MoviesDetailsComponent},
  {path: 'series/:id', component: SeriesDetailsComponent},
  {path: 'discover/series', component: SeriesComponent},
  {path: 'discover/series/:query', component: SeriesComponent},
  {path: 'discover/movies', component: MoviesComponent},
  {path: 'discover/movies/:query', component: MoviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
