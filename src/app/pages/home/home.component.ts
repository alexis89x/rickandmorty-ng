import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RMApiCharacterResult, RMApiResult } from '../../models/data.interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { response } from 'express';

@Component({
  selector: 'ca-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: RMApiCharacterResult[];
  currentPage = 1;

  constructor(
    private dataService: DataService
  ) { }

  getCharacters(pageNumber: number): Observable<RMApiCharacterResult[]> {
    return this.dataService.getCharacters(pageNumber)
      .pipe(
        map((resp: RMApiResult) => resp.results)
      );
  }

  ngOnInit(): void {
    this.getCharacters(this.currentPage)
      .subscribe(characters => {
        this.items = characters;
      });
  }

  onScroll(): void {
    this.getCharacters(this.currentPage + 1)
      .pipe(tap(() => this.currentPage++))
      .subscribe(characters => {
        this.items = [...this.items, ...characters ];
      });
    console.log('scrolled!!');
  }
}
