import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMovieService } from 'src/app/services/api-movie.service';
import { ApiMovieModel } from 'src/models/api-movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: ApiMovieModel[] = []

  //ID dei generi
  actionGenreId: number = 28
  adventureGenreId: number = 12
  animationGenreId: number = 16
  misteryGenreId: number = 9648
  crimeGenreId: number = 80
  documentaryGenreId: number = 99
  dramaGenreId: number = 18
  scienceGenreId: number = 878
  thrillerGenreId: number = 53
  tvMovieGenreId: number = 10770

  private cardWidth: number = 250
  private gapWidth: number = 15
  private scrollableWidth: number = 0 // inizializzato a 0
  private scrollX = 0

  //decoratore per accedere all'elemento cardContainer nel template
  @ViewChild('cardContainer') cardContainer!: ElementRef

  constructor(private apiMovies: ApiMovieService, private router: Router) { }

  ngOnInit(): void {
    this.loadPopularMovies()
  }

  //sezione dei film popolari
  loadPopularMovies() {
    this.apiMovies.getPopularMovies().subscribe(data => {
      this.movies = data.results
      this.calculateScrollableWidth()
    })
  }

  //calcolo la lunghezza dello scrollabile
  calculateScrollableWidth() {
    this.scrollableWidth = this.cardWidth * this.movies.length + this.gapWidth * (this.movies.length - 1)
  }

  //gestisco entrambi i scroll
  scrollLeft() {
    this.scrollX = Math.max(this.scrollX - this.cardWidth, 0)
    this.updateScrollPosition()
  }

  scrollRight() {
    const maxScrollPosition = this.scrollableWidth - this.cardContainer.nativeElement.offsetWidth
    this.scrollX = Math.min(this.scrollX + this.cardWidth, maxScrollPosition)
    this.updateScrollPosition()
  }

  //aggiorna la posizione dello scroll
  private updateScrollPosition() {
    this.cardContainer.nativeElement.style.transform = `translateX(-${this.scrollX}px)`
  }

  viewMovieDetails(movieID: number): void {
    this.router.navigate(['/movie-details', movieID])
  }

}
