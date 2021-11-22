import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorEditDialogComponent } from './autor-edit-dialog.component';

describe('AutorEditDialogComponent', () => {
  let component: AutorEditDialogComponent;
  let fixture: ComponentFixture<AutorEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
