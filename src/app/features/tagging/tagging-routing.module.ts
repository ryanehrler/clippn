import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaggingComponent } from './tagging/tagging.component';

const routes: Routes = [
  {
    path: '',
    component: TaggingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaggingRoutingModule {}
