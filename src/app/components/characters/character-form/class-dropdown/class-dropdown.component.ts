import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { classes as commonClasses } from 'src/app/common/character.common';

@Component({
  selector: 'app-class-dropdown',
  templateUrl: './class-dropdown.component.html',
  styleUrls: ['./class-dropdown.component.scss'],
})
export class ClassDropdownComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() controlName: FormGroup;

  form: FormGroup;
  classes: string[];

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.classes = [...commonClasses];
  }

  search(event) {
    this.classes = this.classes.filter((x) => x.includes(event.query));
  }

  handleDropdown(event) {
    //event.query = current value in input field
  }
}
