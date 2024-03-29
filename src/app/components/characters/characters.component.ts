import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CHARACTER_TYPE } from 'src/app/common/constant';
import CharacterGenerator from 'src/app/generators/characterGenerator';
import {
  addCharacter,
  generateRandomCharacter,
  loadCharacters,
} from 'src/app/state/character/character.action';
import { openForm } from 'src/app/state/ui/ui.action';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCharacters());
  }

  openNewForm() {
    this.store.dispatch(openForm({ newFormType: CHARACTER_TYPE }));
  }

  generateRandomCharacter() {
    const generator = new CharacterGenerator();
    this.store.dispatch(addCharacter({ character: generator.next() }));
  }
}
