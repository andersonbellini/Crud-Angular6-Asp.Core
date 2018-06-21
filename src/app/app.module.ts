import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceHelpersService } from './_services/service-helper.service';
import { GameModule } from './game/game.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { AboutModule } from './about/about.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([], { useHash: true }),
    GameModule,
    AboutModule
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [ ServiceHelpersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
