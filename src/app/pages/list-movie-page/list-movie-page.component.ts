import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenresService } from 'src/app/services/genres.service';
import { ApiMovieModel } from 'src/models/api-movie.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-movie-page',
  templateUrl: './list-movie-page.component.html',
  styleUrls: ['./list-movie-page.component.css']
})
export class ListMoviePageComponent implements OnInit {

  movies: ApiMovieModel[] = []
  genreId!: number
  page: number = 1
  isLoading: boolean = false

  constructor(private router: Router, private route: ActivatedRoute, private genreService: GenresService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genreId = params['id']
      this.movies = []
      this.page = 1
      this.loadMoviesByGenre()
    })
  }

  loadMoviesByGenre() {
    this.isLoading = true
    this.genreService.getMoviesByGenres(this.genreId, this.page).subscribe(data => {
      this.movies = [...this.movies, ...data.results]
      this.isLoading = false
    })
  }

  onScroll() {
    if (!this.isLoading) {
      this.page++
      this.loadMoviesByGenre()
    }
  }

  //il servizio location serve per riportare la pagina alla vista precedente
  goBack() {
    this.location.back()
  }

  showMovieDetails(movieID: number) {
    this.router.navigate(['/movie-details', movieID])
  }

}
