import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorAddDialogComponent } from './autor-add-dialog.component';

describe('AutorAddDialogComponent', () => {
  let component: AutorAddDialogComponent;
  let fixture: ComponentFixture<AutorAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
