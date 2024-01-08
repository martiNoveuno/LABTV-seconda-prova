import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from 'src/models/api-movie.model';
import { environment } from '../../environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class ApiMovieService {
  private baseURL = 'https://api.themoviedb.org/3';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  //carosello
  carouselApiData(language: string = 'it-IT'): Observable<Api> {
    return this.http.get<Api>(
      `${this.baseURL}/trending/movie/day?api_key=${this.apiKey}&language=${language}`
    );
  }

  //lista di film popolari
  getPopularMovies(language: string = 'it-IT'): Observable<Api> {
    return this.http.get<Api>(
      `${this.baseURL}/movie/popular?api_key=${this.apiKey}&language=${language}`
    );
  }
}
