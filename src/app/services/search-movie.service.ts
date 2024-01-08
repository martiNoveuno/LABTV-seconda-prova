import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/models/api-movie.model';
import { environment } from '../../environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class SearchMovieService {
  private baseURL = 'https://api.themoviedb.org/3';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<Api> {
    return this.http.get<Api>(
      `${this.baseURL}/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&api_key=${this.apiKey}&language=it-IT&page=1`
    );
  }
}
