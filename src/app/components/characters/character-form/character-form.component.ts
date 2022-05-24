import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, take, takeLast, tap } from 'rxjs';
import { CHARACTER_TYPE } from 'src/app/common/constant';
import { DbService } from 'src/app/db/db.service';
import Character from 'src/app/model/character.model';
import { addCharacter } from 'src/app/state/character/character.action';
import {
  closeForm,
  editCharachter,
  selectCharachter,
} from 'src/app/state/character/ui/character.ui.action';
import { characterUISelector } from 'src/app/state/character/ui/character.ui.selector';
import { CharacterUIState } from 'src/app/state/state';
import { v4 } from 'uuid';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent {
  characterForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(''),
    race: new FormControl(''),
    class: new FormControl(''),
    age: new FormControl(''),
    description: new FormControl(''),
  });

  ui$ = this.store
    .select(characterUISelector)
    .subscribe((x) => this.mapForm(x.selectedCharacter));

  constructor(private store: Store, private dbService: DbService) {}

  mapForm(x: Character): void {
    if (x == null) this.characterForm.reset();
    else
      this.characterForm.patchValue({
        id: x._id,
        name: x.name,
        race: x.race,
        class: x.class,
        age: x.age,
        description: x.description,
      });
  }

  onSubmit() {
    let char: Character = {
      _id: this.characterForm.controls['id'].value,
      name: this.characterForm.controls['name'].value,
      race: this.characterForm.controls['race'].value,
      class: this.characterForm.controls['class'].value,
      isFavorite: false,
      sex: 'male',
      age: this.characterForm.controls['age'].value,
      type: CHARACTER_TYPE,
      description: this.characterForm.controls['description'].value,
    };
    if (char._id === null || char._id === undefined) char._id = v4();

    this.store.dispatch(addCharacter({ character: char }));
    this.closeForm();
  }

  closeForm() {
    this.store.dispatch(closeForm());
    this.characterForm.reset();
  }
}
