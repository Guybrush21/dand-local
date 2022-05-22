import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDropdownComponent } from './class-dropdown.component';

describe('ClassDropdownComponent', () => {
  let component: ClassDropdownComponent;
  let fixture: ComponentFixture<ClassDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
