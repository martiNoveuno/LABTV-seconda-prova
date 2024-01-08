import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { ApiMovieModel } from 'src/models/api-movie.model';
import { CastModel, MovieDetailsModel } from 'src/models/movie-details.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // DomSanitizer serve per "sanitizzare" l'url, in merito ai blocchi di youtube

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieDetails!: MovieDetailsModel
  castDetails!: CastModel
  directorName: string | undefined
  similarMovies: ApiMovieModel[] = []
  trailerURL: SafeResourceUrl | undefined
  movieID!: number
  showTrailerModal = false
  hasTrailer = false

  constructor (private route: ActivatedRoute, private router: Router, private movieDetailsService: MovieDetailsService, private location: Location, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id')
        if (movieId) {
        this.loadMovieDetails(+movieId)
        this.loadCastDetails(+movieId)
        this.loadSimilarMovies(+movieId)
        this.movieTrailer(+movieId)
      } else {
        console.error('ID del film non trovato')
      }
    })
  }

  //carica i dettagli del film
  private loadMovieDetails(movieID: number): void {
    this.movieDetailsService.getMovieDetails(movieID).subscribe(details => {
      this.movieDetails = details
    })
  }

  //carica il cast
  private loadCastDetails(movieID: number): void {
    this.movieDetailsService.getCastDetails(movieID).subscribe(details => {
      this.castDetails = details
      //cercare il nome del regista in crew
      const director = details.crew.find(member => member.job === 'Director')
      if(director) {
        this.directorName = director.name
      }
    })
  }

//carica i film simili
  private loadSimilarMovies(movieID: number): void {
    this.movieDetailsService.similarMovies(movieID).subscribe(res => {
      if(res.results && Array.isArray(res.results)) {
        //uso filter per filtrare i film senza percorso valido del poster e non li mostro
        this.similarMovies = res.results.filter(movies => movies.poster_path != null)
      } else {
        this.similarMovies = []
      }
    })
  }

  //naviga verso la pagina dei dettagli
  viewMovieDetails(movieID: number): void {
    this.router.navigate(['/movie-details', movieID])
  }

  //img del cast
  getProfileImageUrl(path: string | undefined): string {
    if(path) {
          return `https://image.tmdb.org/t/p/w500${path}`
    } else {
      return 'https://placehold.jp/cccccc/ffffff/150x225.png?text=IMG%20not%20Available'
    }
 }

 //trailer del film
 movieTrailer(movieID: number): void {
  this.movieDetailsService.getMovieVideo(movieID).subscribe(response => {
    const trailer = response.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')
    if (trailer) {
      const url = `https://www.youtube.com/embed/${trailer.key}`
      this.trailerURL = this.sanitizeUrl(url)
      this.hasTrailer = true
    } else {
      console.error("Trailer non disponibile")
      this.hasTrailer = false
    }
  })
}

//metodo per sanitizzare l'url
sanitizeUrl(url: string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url)
}
  
  //il servizio location serve per riportare la pagina alla vista precedente
  goBack() {
   this.location.back()
  }

  //mostrare la modale per il trailer
trailerModal(show: boolean): void {
  this.showTrailerModal = show
}
}
