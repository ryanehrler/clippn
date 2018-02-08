import { Component, OnInit } from '@angular/core';
import { ClipService } from '../../../core/services/clip/clip.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  constructor(private clipService: ClipService) {}

  ngOnInit() {}
}
