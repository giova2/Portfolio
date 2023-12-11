import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

type Project = {
  id: string;
  title: string;
  description: string;
  repoLink: string;
  demoLink: string;
  stack: string[];
};

type Projects = Project[];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  projects: Projects = [];
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  ngOnInit() {
    const projectsCollection = collection(this.firestore, 'Records');
    collectionData(projectsCollection).subscribe(res => {
      if (res) {
        this.projects = (res as Projects).map(
          ({ id, title, description, repoLink, demoLink, stack }) => ({
            id,
            title,
            description,
            repoLink,
            demoLink,
            stack,
          })
        );
      }
    });
  }
}
