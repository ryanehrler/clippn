import { Component, OnInit } from '@angular/core';

import { ClipService } from '../../../core/services/clip';
import { ClipTimeNavigationService } from '../../../core/services/clip/clip-time-navigation.service';
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
    ClipTimeNavigationService,
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
