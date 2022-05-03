import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
    ui: CharacterUIState;
    constructor(private store: Store) {}
    ngOnInit(): void {
        this.store
            .select(characterUISelector)
            .subscribe((data) => (this.ui = data));
    }
    openNewForm() {
        this.store.dispatch(openNewForm());
    }
    closeForm() {
        this.store.dispatch(closeForm());
    }
}
