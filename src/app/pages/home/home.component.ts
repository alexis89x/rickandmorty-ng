import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RMApiCharacter, RMApiEpisode, RMApiResult } from '../../models/data.interface';
import { Observable } from 'rxjs';
import { map, tap, throttle, throttleTime } from 'rxjs/operators';
import { extractEpisodesFromCharacter } from '../../utils/episode.utils';

@Component({
  selector: 'ca-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  characters: RMApiCharacter[];
  episodes: RMApiEpisode[];
  currentPage = 1;
  loading: boolean;

  constructor(
    private dataService: DataService
  ) { }

  getCharacters(pageNumber: number): Observable<RMApiCharacter[]> {
    return this.dataService.getCharacters(pageNumber)
      .pipe(
        map((resp: RMApiResult) => resp.results)
      );
  }

  ngOnInit(): void {
    this.getCharacters(this.currentPage)
      .subscribe(characters => {
        const requiredEpisodeList = new Set(
          ...(characters.map(extractEpisodesFromCharacter))
        );
        this.dataService.getEpisodes(Array.from(requiredEpisodeList))
          .subscribe(episodes => {
            this.episodes = episodes;
            this.characters = characters;
            console.log(episodes);
          });
        console.log(requiredEpisodeList);
      });
  }

  onScroll(): void {
    if (this.loading) { return; }
    this.loading = true;
    this.getCharacters(this.currentPage + 1)
      .pipe(
        tap(() => this.currentPage++)
      ).subscribe(characters => {
        this.loading = false;
        this.characters = [...this.characters, ...characters ];
        const requiredEpisodeList = new Set(
          ...(this.characters.map(extractEpisodesFromCharacter))
        );
        console.log(requiredEpisodeList);
      });
    console.log('scrolled!!');
  }
}
