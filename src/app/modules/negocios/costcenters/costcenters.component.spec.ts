import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostcentersComponent } from './costcenters.component';

describe('CostcentersComponent', () => {
  let component: CostcentersComponent;
  let fixture: ComponentFixture<CostcentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostcentersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostcentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
