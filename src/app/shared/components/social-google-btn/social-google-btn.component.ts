import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-social-google-btn',
  templateUrl: './social-google-btn.component.html',
  styleUrls: ['./social-google-btn.component.scss']
})
export class SocialGoogleBtnComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;
  @Input() click: () => void;

  constructor() {}

  ngOnInit() {}
}
