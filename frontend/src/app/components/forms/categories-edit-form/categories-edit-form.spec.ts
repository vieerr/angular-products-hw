import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesEditForm } from './categories-edit-form';

describe('CategoriesEditForm', () => {
  let component: CategoriesEditForm;
  let fixture: ComponentFixture<CategoriesEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
