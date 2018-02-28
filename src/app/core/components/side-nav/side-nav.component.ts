import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  navItems = [
    { label: 'Add Clip', iconName: 'add', path: 'add-video' },
    { label: 'Library', iconName: 'video_library', path: 'library' },
    { label: 'Admin', iconName: 'settings', path: 'admin' },
    { label: 'Tagging', iconName: 'tagging', path: 'tagging' }
  ];

  constructor() {}

  ngOnInit() {}

  navigateTo(path: string) {}
}
