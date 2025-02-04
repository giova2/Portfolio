import {
  Component,
  ElementRef,
  OnInit,
  inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  query as fbQuery,
  orderBy,
  getDocs,
} from '@angular/fire/firestore';
import { Project, Projects } from './types';
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
import { LoadingComponent } from '../loading/loading.component';
import { getCachedProjects, setCachedProjects } from './utils';

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
  imports: [CommonModule, RouterLink, RouterOutlet, LoadingComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss', './svgs.scss', './blockchain.scss'],
  animations: [listAnimation],
})
export class ProjectsComponent implements OnInit {
  @ViewChild('mainContainer', { static: false }) mainContainerRef!: ElementRef;

  title = 'Projects';
  projects: Projects = [];
  showHome = false;
  loading = true;
  loadingAnimationFinishDone = false;
  private firestore: Firestore = inject(Firestore);
  count = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const itemId = this.route.snapshot.paramMap.get('id');
    const cachedProjects = getCachedProjects(itemId);
    if (cachedProjects) {
      this.projects = cachedProjects;
      this.loading = false;
      this.showHome = !!itemId;
      return;
    }
    let projectsCollectionRef;
    if (itemId) {
      projectsCollectionRef = collection(
        this.firestore,
        `Records/${itemId}/Projects`
      );
      this.showHome = true;
    } else {
      projectsCollectionRef = collection(this.firestore, 'Records');
    }
    const projectsQuery = fbQuery(projectsCollectionRef, orderBy('order'));
    const projectsQuerySnapshot = await getDocs(projectsQuery);
    console.log({ projectsQuerySnapshot });
    projectsQuerySnapshot.forEach(res => {
      const project = res.data() as Project;
      if (project && !!project.visible) {
        this.projects.push({ ...project, id: res.id });
      }
    });
    setCachedProjects(itemId, this.projects);

    this.loading = false;
  }

  captureDoneEvent() {
    if (this.mainContainerRef && this.projects.length) {
      const mainContainer = this.mainContainerRef.nativeElement;
      mainContainer.classList.add('mainContainer');
    }
  }

  gotoMain() {
    this.router.navigate(['/']);
  }

  turnOffLoading() {
    this.loadingAnimationFinishDone = true;
  }
}
