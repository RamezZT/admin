import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLibrariesComponent } from './all-libraries.component';

describe('AllLibrariesComponent', () => {
  let component: AllLibrariesComponent;
  let fixture: ComponentFixture<AllLibrariesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllLibrariesComponent]
    });
    fixture = TestBed.createComponent(AllLibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
