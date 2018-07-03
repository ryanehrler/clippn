import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFacebookBtnComponent } from './social-facebook-btn.component';

describe('SocialFacebookBtnComponent', () => {
  let component: SocialFacebookBtnComponent;
  let fixture: ComponentFixture<SocialFacebookBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialFacebookBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialFacebookBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
