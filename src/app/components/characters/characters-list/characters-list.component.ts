import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Character from 'src/app/model/character.model';
import { loadCharacters } from 'src/app/state/character/character.action';
import {
  selectAllCharacters,
  selectOnlyFavoriteCharacters,
} from 'src/app/state/character/character.selector';
import { loadItems } from 'src/app/state/items/item.actions';
import { AppState } from 'src/app/state/state';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  @Input() onlyFavorites: boolean;
  characters$ = this.store.select(selectAllCharacters);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadItems());
    this.store.dispatch(loadCharacters());
  }

  ngOnInit(): void {
    if (this.onlyFavorites) {
      this.characters$ = this.store.select(selectOnlyFavoriteCharacters);
    }
  }
}
