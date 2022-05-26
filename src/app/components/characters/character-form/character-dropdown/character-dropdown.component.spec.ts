import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

import { CharacterDropdownComponent } from './character-dropdown.component';

describe('CharacterDropdownComponent', () => {
  let component: CharacterDropdownComponent;
  let fixture: ComponentFixture<CharacterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterDropdownComponent],
      providers: [provideMockStore({}), ControlContainer],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDropdownComponent);
    component = fixture.componentInstance;
    component.type = 'CLASS';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
