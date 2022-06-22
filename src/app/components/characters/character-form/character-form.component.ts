import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, take, takeLast, tap } from 'rxjs';
import { CHARACTER_TYPE } from 'src/app/common/constant';
import { DbService } from 'src/app/db/db.service';
import Character from 'src/app/model/character.model';
import { addCharacter } from 'src/app/state/character/character.action';
import { closeForm } from 'src/app/state/ui/ui.action';
import { uiSelector } from 'src/app/state/ui/ui.selector';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent {
  characterForm = new FormGroup({
    id: new FormControl(),
    _rev: new FormControl(),
    name: new FormControl(''),
    race: new FormControl(''),
    class: new FormControl(''),
    age: new FormControl(''),
    description: new FormControl(''),
    isFavorite: new FormControl(false),
  });

  character: Character;
  ui$ = this.store
    .select(uiSelector)
    .subscribe((x) => {      
      this.mapForm(x.selectedCharacter)
      this.character = x.selectedCharacter
    });

  constructor(private store: Store) {}

  mapForm(x: Character): void {
    if (x == null) this.characterForm.reset();
    else
      this.characterForm.patchValue({
        id: x._id,
        _rev: x._rev,
        name: x.name,
        race: x.race,
        class: x.class,
        age: x.age,
        description: x.description,
        isFavorite: x.isFavorite,
      });
  }

  onSubmit() {
    let char: Character = {
      _id: this.characterForm.controls['id'].value,
      _rev: this.characterForm.controls['_rev'].value,
      name: this.characterForm.controls['name'].value,
      race: this.characterForm.controls['race'].value,
      class: this.characterForm.controls['class'].value,
      isFavorite: this.characterForm.controls['isFavorite'].value,
      sex: 'male',
      age: this.characterForm.controls['age'].value,
      type: CHARACTER_TYPE,
      description: this.characterForm.controls['description'].value,
    };

    this.store.dispatch(addCharacter({ character: char }));
    this.closeForm();
  }

  closeForm() {
    this.store.dispatch(closeForm());
    this.characterForm.reset();
  }
}
