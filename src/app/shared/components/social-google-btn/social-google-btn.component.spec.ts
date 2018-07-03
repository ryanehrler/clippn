import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialGoogleBtnComponent } from './social-google-btn.component';

describe('SocialGoogleBtnComponent', () => {
  let component: SocialGoogleBtnComponent;
  let fixture: ComponentFixture<SocialGoogleBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialGoogleBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialGoogleBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
