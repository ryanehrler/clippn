import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment.prod';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AdminModule } from './features/admin/admin.module';
import { AnalyzerModule } from './features/analyzer/analyzer.module';
import { LibraryModule } from './features/library/library.module';
import { LoginModule } from './features/login/login.module';
import { TaggingModule } from './features/tagging/tagging.module';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),

    // Feature Modules
    AdminModule,
    AnalyzerModule,
    LibraryModule,
    TaggingModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
