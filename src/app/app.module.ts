import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponentComponent } from './login-component/login-component.component'

import  { SnackbarNotifyService } from './snackbar-notify.service';
import  { AuthServiceService } from './auth-service.service'
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component'

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponentComponent,
    DashboardComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule ,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    MatSnackBarModule,
    MatTableModule,
    // MatPaginator
  ],
  providers: [AuthServiceService, SnackbarNotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
