import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
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
  @ViewChild('container', { static: false }) containerRef!: ElementRef;

  title = 'Projects';
  projects: Projects = [];
  showHome = false;
  private firestore: Firestore = inject(Firestore);
  count = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  async ngOnInit() {
    const itemId = this.route.snapshot.paramMap.get('id');
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
    projectsQuerySnapshot.forEach(res => {
      const project = res.data() as Project;
      console.log({ project, res });
      if (project && !!project.visible) {
        this.projects.push({ ...project, id: res.id });
      }
    });
  }

  captureDoneEvent() {
    // Aquí puedes realizar la lógica que deseas después de que la animación haya terminado
    if (this.containerRef && this.projects.length) {
      const container = this.containerRef.nativeElement;
      container.classList.add('container');
    }
  }

  gotoMain() {
    this.router.navigate(['/']);
  }
}
