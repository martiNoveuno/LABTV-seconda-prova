import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/models/api-movie.model';
import { CastModel, MovieDetailsModel } from 'src/models/movie-details.model';
import { VideoResponse } from 'src/models/video.model';
import { environment } from '../../environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private baseURL = 'https://api.themoviedb.org/3';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getMovieDetails(
    movieID: number,
    language: string = 'it-IT'
  ): Observable<MovieDetailsModel> {
    return this.http.get<MovieDetailsModel>(
      `${this.baseURL}/movie/${movieID}?api_key=${this.apiKey}&language=${language}`
    );
  }

  getCastDetails(
    movieID: number,
    language: string = 'it-IT'
  ): Observable<CastModel> {
    return this.http.get<CastModel>(
      `${this.baseURL}/movie/${movieID}/credits?api_key=${this.apiKey}&language=${language}`
    );
  }

  similarMovies(movieID: number, language: string = 'it-IT'): Observable<Api> {
    return this.http.get<Api>(
      `${this.baseURL}/movie/${movieID}/similar?api_key=${this.apiKey}&language=${language}&page=1`
    );
  }

  //richiesta per il trailer
  getMovieVideo(movieID: number): Observable<VideoResponse> {
    return this.http.get<VideoResponse>(
      `${this.baseURL}/movie/${movieID}/videos?api_key=${this.apiKey}&language=it-IT`
    );
  }
}
