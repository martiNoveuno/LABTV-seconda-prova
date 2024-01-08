import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchMovieService } from 'src/app/services/search-movie.service';
import { ApiMovieModel } from 'src/models/api-movie.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  offcanvasOpen: boolean = false
  searchResults: ApiMovieModel[] = []
  searchTerm: string = ''

  constructor(private searchMovieService: SearchMovieService, private router: Router) {}

  toggleOffcanvas() {
    this.offcanvasOpen = !this.offcanvasOpen
  }

//metodo per la barra di ricerca
onSearch(event: Event): void {
  const input = event.target as HTMLInputElement
  const searchValue = input.value 
  this.searchTerm = input.value
  if (searchValue) {
    this.searchMovieService.searchMovies(searchValue).subscribe({
      next: (response) => {
        this.searchResults = response.results
      },
      error: (error) => {
        console.error(error)
      }
    })
  } else {
    this.searchResults = [] //pulisce i risultati quando la barra di ricerca è vuota
  }
}

//naviga verso la pagina dei dettagli
viewMovieDetails(movieID: number): void {
  this.router.navigate(['/movie-details', movieID]).then(() => {
    //ripulisce il campo di ricerca una volta cliccato sul film e rimandato alla pagina del dettaglio
    this.searchResults = []
    this.searchTerm = ''
  })
}

}
