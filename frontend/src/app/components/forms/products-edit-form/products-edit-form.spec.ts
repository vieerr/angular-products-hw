import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEditForm } from './products-edit-form';

describe('ProductsEditForm', () => {
  let component: ProductsEditForm;
  let fixture: ComponentFixture<ProductsEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
