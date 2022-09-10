import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsAllocationComponent } from './receipts-allocation.component';

describe('ReceiptsAllocationComponent', () => {
  let component: ReceiptsAllocationComponent;
  let fixture: ComponentFixture<ReceiptsAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptsAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptsAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
