import { Component, OnInit } from '@angular/core';
import { ClipService } from '../../../core/services/clip/clip.service';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements OnInit {
  navItems = [
    { label: 'Add', iconName: 'add', path: 'add-video' },
    { label: 'Analyze', iconName: 'dns', path: 'analyze' }
  ];

  constructor() {}

  ngOnInit() {}
}
