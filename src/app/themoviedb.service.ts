import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, shareReplay} from 'rxjs';
import { map } from 'rxjs/operators';
import {Media} from "./interfaces/media";
import {Time} from "@angular/common";
import {Video} from "./interfaces/video";
import {Type} from "./interfaces/Type";
import {Logo} from "./interfaces/logo";

import { environment } from '../environments/environment';

const TMDB_API_KEY = environment.TMDB_API_KEY;
const TMDB_API_URL = environment.TMDB_API_URL;

@Injectable({
  providedIn: 'root'
})
export class ThemoviedbService {
  constructor(private http: HttpClient) { }

  private mapMedia(media: any): Media {
    return {
      id: media.id,
      title: media.title ? media.title : media.name,
      isForAdult: media.adult,
      type: media.media_type === "movie" ? "movies" : "series",
      image: {
        poster: media.poster_path,
        backdrop: media.backdrop_path,
      },
      overview: media.overview,
      releasedAt: media.release_date ? media.release_date : media.first_air_date,
      language: {
        original: media.original_language,
      },
    };
  }

  searchMedias(query: string, page: number): Observable<Media[]> {
    return this.http.get<any>(`${TMDB_API_URL}/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`)
      .pipe(map(response => response.results.filter((media: any) => media.poster_path && media.backdrop_path && media.overview && (media.media_type === "movie" || media.media_type === "tv")).map(this.mapMedia)));
  }

  getSimilarMedias(type: Type, id: string, page: number): Observable<Media[]> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type === "movies" ? "movie" : "tv"}/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`)
      .pipe(map(response => response.results.filter((media: any) => media.poster_path && media.backdrop_path && media.overview).map(this.mapMedia)));
  }

  getTrendingMedias(type: Type, time: string): Observable<Media[]> {
    return this.http.get<any>(`${TMDB_API_URL}/3/trending/${type === "movies" ? "movie" : "tv"}/${time}?api_key=${TMDB_API_KEY}`)
      .pipe(map(response => response.results.filter((media: any) => media.poster_path && media.backdrop_path && media.overview).map(this.mapMedia)));
  }

  getGroupMedias(name: string, type: Type, page: number): Observable<Media[]> {
    const group = name.split("-").join("_");
    return this.http.get<any>(`${TMDB_API_URL}/3/${type === "movies" ? "movie" : "tv"}/${group}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`)
      .pipe(map(response => response.results.filter((media: any) => media.poster_path && media.backdrop_path && media.overview).map(this.mapMedia)));
  }

  getMediaDetails(type: Type, id: string): Observable<Media> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type === "movies" ? "movie" : "tv"}/${id}?api_key=${TMDB_API_KEY}&language=en-US`)
      .pipe(map(this.mapMedia));
  }

  getMediaMeasure(type: Type, id: string): Observable<number> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type === "movies" ? "movie" : "tv"}/${id}?api_key=${TMDB_API_KEY}&language=en-US`)
      .pipe(map(data => data.runtime ? data.runtime : data.number_of_seasons));
  }

  getMediaVideo(type: Type, id: string): Observable<Video> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type === "movies" ? "movie" : "tv"}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`)
      .pipe(map(response => response.results.find((result: any) => (result.type === "Trailer" || result.type === "Teaser") && result.official)));
  }

  getMediaLogo(type: Type, id: string): Observable<Logo> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type === "movies" ? "movie" : "tv"}/${id}/images?api_key=${TMDB_API_KEY}`)
      .pipe(map(response => {
        const logos = response.logos.filter((logo: any) => logo.iso_639_1 === "en");
        const random = Math.floor(Math.random() * logos.length);
        return {
          aspectRatio: logos[random].aspect_ratio,
          width: logos[random].width,
          height: logos[random].height,
          image: logos[random].file_path,
        };
      }));
  }

  getMediaSpotlight(type: Type): Observable<Media> {
    console.log(type);
    return this.http.get<any>(`${TMDB_API_URL}/3/trending/${type === "movies" ? "movie" : type === "series" ? "tv" : "all"}/day?api_key=${TMDB_API_KEY}`)
      .pipe(map(response => {
        const medias = response.results.filter((media: any) => media.backdrop_path && media.overview);
        const random = Math.floor(Math.random() * medias.length);
        console.log(medias[random]);
        return this.mapMedia(medias[random]);
      }), shareReplay(1));
  }
}
