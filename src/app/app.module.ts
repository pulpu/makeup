import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DataService } from '../app/data.service';
import { NgMasonryGridModule } from 'ng-masonry-grid';

import { AppComponent } from './app.component';
import { LanguageComponent } from './language/language.component';
import { HomeComponent } from './language/home/home.component';
import { NavComponent } from './language/nav/nav.component';
import { IntroComponent } from './language/nav/intro/intro.component';
import { GalleryComponent } from './language/nav/gallery/gallery.component';
import { Error404Component } from './language/error404/error404.component';
import { AdminComponent } from './language/nav/admin/admin.component';
import { ParagraphComponent } from './language/nav/paragraph/paragraph.component';
import { AppRouterModule } from './app-routing.module';
import { environment} from '../environments/environment';
import { AdminModalComponent } from './language/nav/admin/admin-modal/admin-modal.component';
import { FireFormDirective } from './fire-form.directive';
import { ModalComponent } from './language/nav/admin/modal/modal.component';


const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,

];

@NgModule({
  declarations: [
    AppComponent,
    LanguageComponent,
    HomeComponent,
    NavComponent,
    IntroComponent,
    GalleryComponent,
    Error404Component,
    AdminComponent,
    ParagraphComponent,
    AdminModalComponent,
    FireFormDirective,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    DeviceDetectorModule.forRoot(),
    BrowserAnimationsModule,
    NgMasonryGridModule,
    ...modules,
    NgbModule.forRoot()
  ],
  exports:[
    ...modules
  ],
    providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
