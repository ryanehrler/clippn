import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/services/auth/auth.guard';

import { LoginPageComponent } from './features/login/login-page/login-page.component';
import { ErrorComponent } from './core/components/error/error.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-video',
        loadChildren: './features/analyzer/analyzer.module#AnalyzerModule'
      },
      {
        path: 'library',
        loadChildren: './features/library/library.module#LibraryModule'
      },
      {
        path: 'admin',
        loadChildren: './features/admin/admin.module#AdminModule'
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
