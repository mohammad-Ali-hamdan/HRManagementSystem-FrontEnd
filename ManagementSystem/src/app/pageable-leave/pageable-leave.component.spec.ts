import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageableLeaveComponent } from './pageable-leave.component';

describe('PageableLeaveComponent', () => {
  let component: PageableLeaveComponent;
  let fixture: ComponentFixture<PageableLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageableLeaveComponent]
    });
    fixture = TestBed.createComponent(PageableLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
