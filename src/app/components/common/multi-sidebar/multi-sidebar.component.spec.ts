import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { MultiSidebarComponent } from './multi-sidebar.component';

describe('MultiSidebarComponent', () => {
  let component: MultiSidebarComponent;
  let fixture: ComponentFixture<MultiSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiSidebarComponent],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
