import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Character from 'src/app/model/character.model';
import { selectAllCharacters } from 'src/app/state/character/character.selector';
import { AppState } from 'src/app/state/state';
import { DataViewModule } from 'primeng/dataview';
import { removeCharacter } from 'src/app/state/character/character.action';

@Component({
    selector: 'app-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
    characters$: Observable<Array<Character>>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.characters$ = this.store.select(selectAllCharacters);
    }

    remove(character: Character) {
        this.store.dispatch(removeCharacter({ character }));
    }
}
