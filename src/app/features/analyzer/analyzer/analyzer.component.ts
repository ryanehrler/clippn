import { Component, OnInit } from '@angular/core';

import { ClipService } from '../../../core/services/clip/clip.service';
import { Battlefield1AnalyzerService } from '../../../core/services/game-analyzer/battlefield1-analyzer.service';
import { FortniteAnalyzerService } from '../../../core/services/game-analyzer/fortnite-analyzer.service';
import { IGameAnalyzer } from '../../../core/services/game-analyzer/IGameAnalyzer';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss'],
  providers: [ClipService, FortniteAnalyzerService, Battlefield1AnalyzerService]
})
export class AnalyzerComponent implements OnInit {
  navItems = [
    { label: 'Add', iconName: 'add', path: 'add-video' },
    { label: 'Analyze', iconName: 'dns', path: 'analyze' }
  ];

  constructor() {}

  ngOnInit() {}
}
