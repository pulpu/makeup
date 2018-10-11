import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// import { AppComponent } from './app.component';
// import { LanguageComponent } from './language/language.component';
// import { NavComponent } from './language/nav/nav.component';
// import { ParagraphComponent } from './language/nav/paragraph/paragraph.component';
import { AdminComponent } from './language/nav/admin/admin.component';
import { GalleryComponent } from './language/nav/gallery/gallery.component';
import { IntroComponent } from './language/nav/intro/intro.component';
//import { ThemeVideoComponent } from './language/nav/theme-video/theme-video.component';
import { HomeComponent } from './language/home/home.component';
import { Error404Component } from './language/error404/error404.component';



const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, children: [
    { path: ':language', component: IntroComponent },
    { path: ':language/:category', component: GalleryComponent }, 
  ]}, 

   {path: 'admin/:language/:id', component: AdminComponent, data: {message: 'Admin Page'}
  },

    {path: '', redirectTo: '/home/ro', pathMatch: 'full'},
    // {path: '404', component: PageNotFoundComponent},
    {path: '404', component: Error404Component, data: {message: 'Page not found!'}},
    {path: '**', redirectTo: '404'}
];


@NgModule({
imports: [
	RouterModule.forRoot( appRoutes )
], 
exports: [ RouterModule]
})

export class AppRouterModule {

}