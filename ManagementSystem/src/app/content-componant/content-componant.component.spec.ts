import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponantComponent } from './content-componant.component';

describe('ContentComponantComponent', () => {
  let component: ContentComponantComponent;
  let fixture: ComponentFixture<ContentComponantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentComponantComponent]
    });
    fixture = TestBed.createComponent(ContentComponantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
