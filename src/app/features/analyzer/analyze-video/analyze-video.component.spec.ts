import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeVideoComponent } from './analyze-video.component';

describe('AnalyzeVideoComponent', () => {
  let component: AnalyzeVideoComponent;
  let fixture: ComponentFixture<AnalyzeVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
