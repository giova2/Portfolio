import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  projects: {
    id: string;
    title: string;
    description: string;
    repoLink: string;
    demoLink: string;
    stack: string[];
  }[];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore
      .collection('/Records/')
      .snapshotChanges()
      .subscribe((res) => {
        if (res) {
          this.projects = res.map((e) => {
            return {
              id: e.payload.doc.id,
              title: e.payload.doc.data()['title'],
              description: e.payload.doc.data()['description'],
              repoLink: e.payload.doc.data()['repoLink'],
              demoLink: e.payload.doc.data()['demoLink'],
              stack: e.payload.doc.data()['stack'],
            };
          });
        }
      });
  }
}
