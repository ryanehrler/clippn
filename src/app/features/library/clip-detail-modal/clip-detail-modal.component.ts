import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Clip } from '../../../core/services/clip/clip';

@Component({
  selector: 'app-clip-detail-modal',
  templateUrl: './clip-detail-modal.component.html',
  styleUrls: ['./clip-detail-modal.component.scss']
})
export class ClipDetailModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
