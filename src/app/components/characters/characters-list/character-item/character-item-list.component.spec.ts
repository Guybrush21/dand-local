import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfirmationService } from 'primeng/api';

import { CharacterItemListComponent } from './character-item-list.component';

describe('CharacterItemListComponent', () => {
  let component: CharacterItemListComponent;
  let fixture: ComponentFixture<CharacterItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterItemListComponent],
      providers: [provideMockStore({}), ConfirmationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterItemListComponent);
    component = fixture.componentInstance;
    component.character = {
      name: 'nic',
      race: 'human',
      class: 'developer',
      isFavorite: false,
      sex: 'female',
      type: 'character',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
