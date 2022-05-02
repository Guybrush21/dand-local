import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Character from 'src/app/model/character.model';
import { retriveCharacter } from 'src/app/state/character/character.action';
import { selectAllCharacters } from 'src/app/state/character/character.selector';
import { AppState } from 'src/app/state/state';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
    ngOnInit(): void {}
}
