import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'projects/:id', component: ProjectsComponent },
];
