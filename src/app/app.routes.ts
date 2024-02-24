import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'projects/:id', component: ProjectsComponent },
  { path: '**', component: PageNotFoundComponent },
];
