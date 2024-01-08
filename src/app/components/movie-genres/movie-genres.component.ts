import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenresService } from 'src/app/services/genres.service';
import { ApiMovieModel } from 'src/models/api-movie.model';

@Component({
  selector: 'app-movie-genres',
  templateUrl: './movie-genres.component.html',
  styleUrls: ['./movie-genres.component.css']
})
export class MovieGenresComponent implements OnInit {

  @Input() genreId!: number
  @Input() genreName!: string
  movies: ApiMovieModel[] = []
  
  constructor(private genresService: GenresService, private router: Router) { }

  ngOnInit() {
    this.loadMoviesByGenre()
  }

  loadMoviesByGenre() {
    this.genresService.getMoviesByGenres(this.genreId, 1).subscribe(data => {
      this.movies = data.results.slice(0,7) //con lo slice prendo i primi sette film della prima pagina
    })
  }

  viewMovieList(genreId: number) {
    this.router.navigate(['/genre', genreId])
  }

  viewMovieDetails(movieID: number): void {
    this.router.navigate(['/movie-details', movieID])
  }
}
