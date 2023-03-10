import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/services/auth/auth.guard';

import { ErrorComponent } from './core/components/error/error.component';
import { LoginPageComponent } from './features/login/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'analyzer',
        loadChildren: './features/analyzer/analyzer.module#AnalyzerModule'
      },
      {
        path: 'library',
        loadChildren: './features/library/library.module#LibraryModule'
      },
      {
        path: 'admin',
        loadChildren: './features/admin/admin.module#AdminModule'
      },
      {
        path: 'tagging',
        loadChildren: './features/tagging/tagging.module#TaggingModule'
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '404',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
