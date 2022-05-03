import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Character from 'src/app/model/character.model';
import { removeCharacter } from 'src/app/state/character/character.action';
import { AppState } from 'src/app/state/state';

@Component({
    selector: 'app-character-item-list',
    templateUrl: './character-item-list.component.html',
    styleUrls: ['./character-item-list.component.scss'],
})
export class CharacterItemListComponent implements OnInit {
    @Input() character: Character;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}

    remove(character: Character) {
        this.store.dispatch(removeCharacter({ character }));
    }
}
