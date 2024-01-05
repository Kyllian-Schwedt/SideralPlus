import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, shareReplay} from 'rxjs';
import { map } from 'rxjs/operators';
import {Media} from "./interfaces/media";
import {Time} from "@angular/common";
import {Video} from "./interfaces/video";
import {Type} from "./interfaces/Type";
import {Logo} from "./interfaces/logo";
import {Provider} from "./interfaces/provider/provider";

import { environment } from '../environments/environment';
import {Cast} from "./interfaces/cast";
import {WatchProviders} from "./interfaces/provider/watch-providers";
import {Season} from "./interfaces/season";

const TMDB_API_KEY = environment.TMDB_API_KEY;
const TMDB_API_URL = environment.TMDB_API_URL;

@Injectable({
  providedIn: 'root'
})
export class ThemoviedbService {
  constructor(private http: HttpClient) {

  }

private mapMedia(media: any, type: string = media.media_type): Media {
  return {
    id: media.id,
    title: media.title ? media.title : media.name,
    isForAdult: media.adult,
    type: type === "movie" ? "movie" : "tv",
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
      .pipe(map(response => response.results.filter((media: any) => media.poster_path && media.backdrop_path && media.overview && (media.media_type === "movie" || media.media_type === "tv")).map((media: any) => this.mapMedia(media, media.media_type))));
  }

  searchMediasByType(query: string, type: Type, page: number): Observable<Media[]> {
    return this.http.get<any>(`${TMDB_API_URL}/3/search/${type.toString()}?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`)
      .pipe(map(response => response.results.filter((media: any) => media.poster_path && media.backdrop_path && media.overview && (media.media_type === "movie" || media.media_type === "tv" || type !== "multi")).map((media: any) => this.mapMedia(media, media.media_type? media.media_type : type))));
  }

  searchCompletion(query: string): Observable<string[]> {
    return this.http.get<any>(`${TMDB_API_URL}/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
      .pipe(map(response => response.results.filter((media: any) => media.media_type === "movie" || media.media_type === "tv").map((media: any) => media.title ? media.title : media.name)));
  }

  getSimilarMedias(type: Type, id: string, page: number): Observable<Media[]> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type}/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`)
      .pipe(map(response =>response.results.filter((media: any) => media.poster_path && media.backdrop_path && media.overview).map((media: any) => this.mapMedia(media, type))));
  }

  getTrendingMedias(type: Type, time: string): Observable<Media[]> {
    return this.http.get<any>(`${TMDB_API_URL}/3/trending/${type}/${time}?api_key=${TMDB_API_KEY}`)
      .pipe(map(response => response.results.filter((media: any) => media.poster_path && media.backdrop_path && media.overview).map((media: any) => this.mapMedia(media))));
  }

  getGroupMedias(name: string, type: Type, page: number): Observable<Media[]> {
    const group = name.split("-").join("_");
    return this.http.get<any>(`${TMDB_API_URL}/3/${type}/${group}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`)
      .pipe(map(response => response.results.filter((media: any) => media.poster_path && media.backdrop_path && media.overview).map((media: any) => this.mapMedia(media, type))));
  }

  getMediaDetails(type: Type, id: string): Observable<Media> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type}/${id}?api_key=${TMDB_API_KEY}&language=en-US`)
      .pipe(map(media => this.mapMedia(media, type)), shareReplay(1));
  }

  getMediaMeasure(type: Type, id: string): Observable<number> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type}/${id}?api_key=${TMDB_API_KEY}&language=en-US`)
      .pipe(map(data => data.runtime ? data.runtime : data.number_of_seasons));
  }

  getMediaVideo(type: Type, id: string): Observable<Video> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`)
      .pipe(map(response => response.results.find((result: any) => (result.type === "Trailer" || result.type === "Teaser") && result.official)));
  }

  getMediaLogo(type: Type, id: string): Observable<Logo> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type}/${id}/images?api_key=${TMDB_API_KEY}`)
      .pipe(map(response => {
        const logos = response.logos.filter((logo: any) => logo.iso_639_1 === "en");
        const random = Math.floor(Math.random() * logos.length);
        return {
          aspectRatio: logos[random]?.aspect_ratio,
          width: logos[random]?.width,
          height: logos[random]?.height,
          image: logos[random]?.file_path,
        };
      }));
  }

  getMediaSpotlight(type: Type): Observable<Media> {
    console.log(type);
    return this.http.get<any>(`${TMDB_API_URL}/3/trending/${type}/day?api_key=${TMDB_API_KEY}`)
      .pipe(map(response => {
        const medias = response.results.filter((media: any) => media.backdrop_path && media.overview);
        const random = Math.floor(Math.random() * medias.length);
        console.log(medias[random]);
        return this.mapMedia(medias[random]);
      }), shareReplay(1));
  }

  private mapCast(cast: any): Cast {
    return {
      adult: cast.adult,
      gender: cast.gender,
      id: cast.id,
      known_for_department: cast.known_for_department,
      name: cast.name,
      original_name: cast.original_name,
      popularity: cast.popularity,
      profile_path: cast.profile_path,
      cast_id: cast.cast_id,
      character: cast.character,
      credit_id: cast.credit_id,
      order: cast.order
    };
  }
getMediaCast(type: Type, id: string, season: number = 1): Observable<Cast[]> {
  let url = `${TMDB_API_URL}/3/${type}/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`;
  if (type === 'tv') {
    url = `${TMDB_API_URL}/3/${type}/${id}/season/${season}/credits?api_key=${TMDB_API_KEY}&language=en-US`;
  }
  return this.http.get<any>(url)
    .pipe(map(response => response.cast.filter((cast: any) => cast.profile_path).map(this.mapCast)));
}


  private mapProvider(provider: any): Provider {
    return {
      logo_path: provider.logo_path,
      provider_id: provider.provider_id,
      provider_name: provider.provider_name,
      display_priority: provider.display_priority
    };
  }

  /**
  @Deprecated the API just return if the movie is available on the provider but not the link or the price so this is not very useful
   */
  getWatchProviders(type: Type, id: string): Observable<WatchProviders> {
    return this.http.get<any>(`${TMDB_API_URL}/3/${type}/${id}/watch/providers?api_key=${TMDB_API_KEY}`)
      .pipe(map(response => {
        const providers: WatchProviders = {
          link: response.results.FR.link,
          rent: response.results.FR.rent.map(this.mapProvider),
          buy: response.results.FR.buy.map(this.mapProvider)
        };
        return providers;
      }));
  }

  //get seasons
  private mapSeason(season: any): Season {
    return {
      air_date: season.air_date,
      episode_count: season.episode_count,
      id: season.id,
      name: season.name,
      overview: season.overview,
      poster_path: season.poster_path,
      season_number: season.season_number,
      vote_average: season.vote_average
    };
  }

  getSeasons(series_id: string): Observable<Season[]> {
    return this.http.get<any>(`${TMDB_API_URL}/3/tv/${series_id}?api_key=${TMDB_API_KEY}`)
      .pipe(map(response => response.seasons.filter((season: any) => season.poster_path && season.overview).map(this.mapSeason)));
  }

}
