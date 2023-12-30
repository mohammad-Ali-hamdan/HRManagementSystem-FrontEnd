import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExpenseDetailsComponent } from './delete-expense-details.component';

describe('DeleteExpenseDetailsComponent', () => {
  let component: DeleteExpenseDetailsComponent;
  let fixture: ComponentFixture<DeleteExpenseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteExpenseDetailsComponent]
    });
    fixture = TestBed.createComponent(DeleteExpenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
