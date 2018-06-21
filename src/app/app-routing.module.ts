import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game/game.component';
import { AboutComponent } from './about/about/about.component';

const routes: Routes = [
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: GameComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
