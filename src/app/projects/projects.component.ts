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
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query,
} from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        stagger(
          '50ms',
          animate(
            '500ms ease-out',
            style({ opacity: 1, transform: 'translateX(0px)' })
          )
        ),
      ],
      { optional: true }
    ),
  ]),
]);
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [listAnimation],
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
        this.projects = (res as Projects).filter(project => !!project.visible);
      }
    });
  }

  gotoMain() {
    this.router.navigate(['/']);
  }
}
