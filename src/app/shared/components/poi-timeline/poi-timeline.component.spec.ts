import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiTimelineComponent } from './poi-timeline.component';

describe('PoiTimelineComponent', () => {
  let component: PoiTimelineComponent;
  let fixture: ComponentFixture<PoiTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
