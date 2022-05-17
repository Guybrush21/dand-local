import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DbService } from 'src/app/db/db.service';
import Character from 'src/app/model/character.model';
import { addCharacter } from 'src/app/state/character/character.action';
import { closeForm } from 'src/app/state/character/ui/character.ui.action';
@Component({
    selector: 'app-character-form',
    templateUrl: './character-form.component.html',
    styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent {
    characterForm = new FormGroup({
        name: new FormControl(''),
        race: new FormControl(''),
        class: new FormControl(''),
        age: new FormControl(''),
        description: new FormControl(''),
    });

    constructor(private store: Store, private dbService: DbService) {}

    onSubmit() {
        let char: Character = {
            name: this.characterForm.controls['name'].value,
            race: this.characterForm.controls['race'].value,
            class: this.characterForm.controls['class'].value,
            isFavorite: false,
            sex: 'male',
            type: '',
            description: this.characterForm.controls['description'].value,
        };
        this.store.dispatch(addCharacter({ character: char }));
        this.closeForm();
        this.dbService.save();
    }

    closeForm() {
        this.store.dispatch(closeForm());
        this.characterForm.reset();
    }
}
