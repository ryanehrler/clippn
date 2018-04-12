import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVideoComponent } from './add-video/add-video.component';
import { AnalyzeVideoComponent } from './analyze-video/analyze-video.component';
import { AnalyzerComponent } from './analyzer/analyzer.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyzerComponent,
    children: [
      { path: '', redirectTo: 'add-video', pathMatch: 'full' },
      { path: 'add-video', component: AddVideoComponent },
      { path: 'add-video/:videoName', component: AddVideoComponent },
      { path: 'analyze', component: AnalyzeVideoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyzerRoutingModule {}
