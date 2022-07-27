import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  UntypedFormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { classes as commonClasses } from 'src/app/common/character.common';
import { races as commonRaces } from 'src/app/common/character.common';

@Component({
  selector: 'app-class-dropdown[type]',
  templateUrl: './character-dropdown.component.html',
  styleUrls: ['./character-dropdown.component.scss'],
})
export class CharacterDropdownComponent implements OnInit {
  @Input() parentForm: UntypedFormGroup;
  @Input() controlName: UntypedFormGroup;
  @Input() type: 'CLASS' | 'RACE';

  form: UntypedFormGroup;
  sources: string[];

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as UntypedFormGroup;

    this.sources = this.getSource();
  }

  getSource(): string[] {
    if (this.type === 'CLASS') return commonClasses;
    else if (this.type === 'RACE') return commonRaces;
    else throw Error('type input is neither CLASS nor RACE.');
  }

  search(event) {
    this.sources = this.sources.filter((x) => x.includes(event.query));
  }
}
