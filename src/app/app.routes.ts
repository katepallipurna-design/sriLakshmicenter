import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home.page';
import { AboutPageComponent } from './pages/about.page';
import { GenericPageComponent } from './pages/generic.page';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'book-test', component: GenericPageComponent, data: { pageKey: 'book-test' } },
  { path: 'home-sample-collection', component: GenericPageComponent, data: { pageKey: 'home-sample-collection' } },
  { path: 'buy-health-checkup', component: GenericPageComponent, data: { pageKey: 'buy-health-checkup' } },
  { path: 'upload-prescription', component: GenericPageComponent, data: { pageKey: 'upload-prescription' } },
  { path: 'corporate-wellness', component: GenericPageComponent, data: { pageKey: 'corporate-wellness' } },
  { path: 'investors', component: GenericPageComponent, data: { pageKey: 'investors' } },
  { path: 'locate-centre', component: GenericPageComponent, data: { pageKey: 'locate-centre' } },
  { path: 'download-report', component: GenericPageComponent, data: { pageKey: 'download-report' } },
  { path: '**', redirectTo: '' }
];
