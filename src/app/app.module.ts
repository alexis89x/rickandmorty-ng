import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterComponent } from './components/character/character.component';
import { InferEpisodeNumberPipe } from './pipes/infer-episode-number.pipe';
import { InferEpisodeNamePipe } from './pipes/infer-episode-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CharacterComponent,
    InferEpisodeNumberPipe,
    InferEpisodeNamePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
