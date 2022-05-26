import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { ItemListElementComponent } from './item-list-element.component';

describe('ItemLitsElementComponent', () => {
  let component: ItemListElementComponent;
  let fixture: ComponentFixture<ItemListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogModule],
      declarations: [ItemListElementComponent],
      providers: [provideMockStore({}), ConfirmationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListElementComponent);
    component = fixture.componentInstance;
    component.item = {
      description: '',
      isFavorite: false,
      name: 'sword',
      type: 'item',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
