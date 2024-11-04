import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingHistoryComponent } from './borrowing-history.component';

describe('BorrowingHistoryComponent', () => {
  let component: BorrowingHistoryComponent;
  let fixture: ComponentFixture<BorrowingHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingHistoryComponent]
    });
    fixture = TestBed.createComponent(BorrowingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
