import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
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

    constructor(
        private store: Store<AppState>,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit(): void {}

    confirmDelete(event: Event, character: Character) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.store.dispatch(removeCharacter({ character }));
            },
            reject: () => {
                //reject action
            },
        });
    }
}