import { Component, OnInit } from '@angular/core';

import { ClipService } from '../../../core/services/clip';
import {
  Battlefield1AnalyzerService,
  FortniteAnalyzerService,
  PoiAnalyzerService
} from '../../../core/services/game-analyzer';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss'],
  providers: [
    // Clip Services
    ClipService,
    PoiAnalyzerService,
    // Game Analyzers
    FortniteAnalyzerService,
    Battlefield1AnalyzerService
  ]
})
export class AnalyzerComponent implements OnInit {
  navItems = [
    { label: 'Add', iconName: 'add', path: 'add-video' },
    { label: 'Analyze', iconName: 'dns', path: 'analyze' }
  ];

  constructor() {}

  ngOnInit() {}
}
