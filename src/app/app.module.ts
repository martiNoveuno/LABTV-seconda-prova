import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AreaRiservataComponent } from './pages/area-riservata/area-riservata.component';
import { ContattiComponent } from './pages/contatti/contatti.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MovieGenresComponent } from './components/movie-genres/movie-genres.component';
import { ListMoviePageComponent } from './pages/list-movie-page/list-movie-page.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';  //modulo per lo scroll infinito
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AreaRiservataComponent,
    ContattiComponent,
    CarouselComponent,
    MovieGenresComponent,
    ListMoviePageComponent,
    MovieDetailsComponent,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule
    ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
