import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap, pipe } from 'rxjs';
import Character from 'src/app/model/character.model';
import {
  generateRandomCharacter,
  loadCharacters,
} from 'src/app/state/character/character.action';
import {
  closeForm,
  openNewForm,
} from 'src/app/state/character/ui/character.ui.action';
import { characterUISelector } from 'src/app/state/character/ui/character.ui.selector';
import { CharacterUIState } from 'src/app/state/state';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  ui$ = this.store.select(characterUISelector);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCharacters());
  }

  openNewForm() {
    this.store.dispatch(openNewForm());
  }

  closeForm() {
    this.store.dispatch(closeForm());
  }

  generateRandomCharacter() {
    this.store.dispatch(generateRandomCharacter());
  }
}
