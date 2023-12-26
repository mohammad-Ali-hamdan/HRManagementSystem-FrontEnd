import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditLeaveComponent } from './add-and-edit-leave.component';

describe('AddAndEditLeaveComponent', () => {
  let component: AddAndEditLeaveComponent;
  let fixture: ComponentFixture<AddAndEditLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAndEditLeaveComponent]
    });
    fixture = TestBed.createComponent(AddAndEditLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
