import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AreaRiservataComponent } from './pages/area-riservata/area-riservata.component';
import { ContattiComponent } from './pages/contatti/contatti.component';
import { ListMoviePageComponent } from './pages/list-movie-page/list-movie-page.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'areariservata',
    component: AreaRiservataComponent
  },
  {
    path: 'contatti',
    component: ContattiComponent
  },
  //path per la pagina dove ci sarà la lista dei film 
  {
    path: 'genre/:id',
    component: ListMoviePageComponent
  },
  //path per la pagina dei dettagli con l'id
  {
    path: 'movie-details/:id',
    component: MovieDetailsComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
