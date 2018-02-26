import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipDetailModalComponent } from './clip-detail-modal.component';

describe('ClipDetailModalComponent', () => {
  let component: ClipDetailModalComponent;
  let fixture: ComponentFixture<ClipDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
