import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLitsElementComponent } from './item-lits-element.component';

describe('ItemLitsElementComponent', () => {
  let component: ItemLitsElementComponent;
  let fixture: ComponentFixture<ItemLitsElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemLitsElementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLitsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
