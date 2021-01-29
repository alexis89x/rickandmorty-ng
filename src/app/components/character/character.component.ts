import { Component, Input, OnInit } from '@angular/core';
import { RMApiCharacterResult } from '../../models/data.interface';

@Component({
  selector: 'ca-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() character: RMApiCharacterResult;

  constructor() { }

  ngOnInit(): void {
  }

}
