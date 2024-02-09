import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Projects } from './types';
import {
  Router,
  ActivatedRoute,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  title = 'Projects';
  projects: Projects = [];
  showHome = false;
  private firestore: Firestore = inject(Firestore);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const itemId = this.route.snapshot.paramMap.get('id');
    let projectsCollection;
    if (itemId) {
      projectsCollection = collection(
        this.firestore,
        `Records/${itemId}/Projects`
      );
      this.showHome = true;
    } else {
      projectsCollection = collection(this.firestore, 'Records');
    }

    collectionData(projectsCollection, { idField: 'id' }).subscribe(res => {
      if (res) {
        console.log(res);
        this.projects = (res as Projects).filter(project => !!project.visible);
      }
    });
  }

  gotoMain() {
    this.router.navigate(['/']);
  }
}
