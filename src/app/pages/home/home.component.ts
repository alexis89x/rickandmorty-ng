import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { RMApiCharacter, RMApiEpisode, RMApiResult } from '../../models/data.interface';
import { DataService } from '../../services/data.service';
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
  maxPages = 100;
  isLoading: boolean;

  constructor(
    private dataService: DataService
  ) { }

  getCharacters(pageNumber: number): Observable<RMApiCharacter[]> {
    this.isLoading = true;
    return this.dataService.getCharacters(pageNumber)
      .pipe(
        catchError(() => {
          alert('Error while loading characters');
          // Should be done a better error handling though
          return of(null);
        }),
        tap((resp: RMApiResult) => {
          if (resp) {
            // API returns available number of pages. Save it to prevent unecessary calls.
            this.maxPages = resp.info.pages;
          }
          this.isLoading = false;
        }),
        map((resp: RMApiResult) => resp.results)
      );
  }

  ngOnInit(): void {
    this.characters = [];
    this.getCharacters(this.currentPage)
      .subscribe(characters => {
        if (!characters) { return; }

        const requiredEpisodeList = new Set(
          ...(characters.map(extractEpisodesFromCharacter))
        );
        this.dataService.getEpisodes(Array.from(requiredEpisodeList))
          .subscribe(episodes => {
            this.episodes = episodes;
            this.characters = characters;
          });
      });
  }

  canScroll(): boolean {
    return !this.isLoading && (this.currentPage < this.maxPages);
  }

  onScroll(): void {
    if (!this.canScroll()) { return; }
    this.getCharacters(this.currentPage + 1)
      .pipe(
        tap((resp) => resp && this.currentPage++)
      ).subscribe(characters => {
        if (!characters) { return; }

        this.characters = [...this.characters, ...characters ];
        /*const requiredEpisodeList = new Set(
          ...(this.characters.map(extractEpisodesFromCharacter))
        );*/
        /*
         Explanation: theoretically the new characters have their own set of episodes.
         The idea was to create an internal map of episodes, so that when we load the
         new character after scrolling, we also load only the necessary episodes that we didn't load.
         This should be the real process, but with this specific API the first character appears in all the episodes.
         So this is not really necessary. Sorry for skipping it for this test.
         */
      });
  }

  trackById(index: number, item: RMApiCharacter): number {
    return item.id;
  }
}
