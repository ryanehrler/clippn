import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllVideosComponent } from './all-videos/all-videos.component';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  {
    path: '',
    component: AllVideosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {}
