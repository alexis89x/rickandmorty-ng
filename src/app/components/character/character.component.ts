import { Component, Input, OnInit } from '@angular/core';
import { RMApiCharacter, RMApiEpisode } from '../../models/data.interface';

@Component({
  selector: 'ca-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() character: RMApiCharacter;
  @Input() episodeList: RMApiEpisode[];

  constructor() { }

  ngOnInit(): void {
    // console.log(this.character);
  }

}
