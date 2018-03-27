import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalAnalysisComponent } from './interval-analysis.component';

describe('IntervalAnalysisComponent', () => {
  let component: IntervalAnalysisComponent;
  let fixture: ComponentFixture<IntervalAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervalAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
