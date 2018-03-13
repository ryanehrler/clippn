import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiChipComponent } from './poi-chip.component';

describe('PoiChipComponent', () => {
  let component: PoiChipComponent;
  let fixture: ComponentFixture<PoiChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
