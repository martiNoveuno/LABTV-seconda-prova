import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ApiMovieService } from 'src/app/services/api-movie.service';
import { ApiMovieModel } from 'src/models/api-movie.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {

  carouselMovies: ApiMovieModel[] = []
  currentSlideIndex: number = 0

  timer: any

  constructor(private apiMovies: ApiMovieService) { }

  ngOnInit(): void {
    this.getCarouselMovies()
    this.startSlide()
  }

  ngOnDestroy(): void {
    this.stopSlide()
  }

  //decoratore per gestire il visibilitychange sulle immagini del carosello
  @HostListener('window:visibilitychange')
  onVisibilityChange(): void {
    if (document.hidden) {
      this.stopSlide()
    } else {
      this.startSlide()
    }
  }

  getCarouselMovies() {
    this.apiMovies.carouselApiData().subscribe((response) => {
      this.carouselMovies = response.results
      if (this.carouselMovies.length) {
        this.currentSlideIndex = 0
      }
    })
  }

  nextSlide() {
    const nextIndex = this.currentSlideIndex + 1
    this.currentSlideIndex = nextIndex % this.carouselMovies.length
  }

  prevSlide() {
    const prevIndex = (this.currentSlideIndex - 1 + this.carouselMovies.length) % this.carouselMovies.length
    this.currentSlideIndex = prevIndex
  }

  startSlide() {
    this.timer = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopSlide() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  get containerStyle() {
    return {
      'transform': `translateX(-${this.currentSlideIndex * 100}%)`,
      'transition': 'transform 0.5s ease-in-out'
    }
  }
}
