import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/services/auth/auth.guard';

import { LoginPageComponent } from './features/login/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'add-video',
    loadChildren: './features/analyzer/analyzer.module#AnalyzerModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'library',
    loadChildren: './features/library/library.module#LibraryModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './features/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
