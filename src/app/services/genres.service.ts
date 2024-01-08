import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Api } from 'src/models/api-movie.model';
import { ApiGenres } from 'src/models/genre-model';
import { environment } from '../../environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private baseURL = 'https://api.themoviedb.org/3';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getGenres(): Observable<ApiGenres> {
    return this.http.get<ApiGenres>(
      `${this.baseURL}/genre/movie/list?api_key=${this.apiKey}&language=it-IT`
    );
  }

  //lista di film suddivisi per genere
  getMoviesByGenres(genreId: number, page: number): Observable<Api> {
    return this.http.get<Api>(
      `${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`
    );
  }
}
