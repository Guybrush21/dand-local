import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterItemListComponent } from './character-item-list.component';

describe('CharacterItemComponent', () => {
  let component: CharacterItemListComponent;
  let fixture: ComponentFixture<CharacterItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterItemListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
