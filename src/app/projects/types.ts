export type Project = {
  id: string;
  title: string;
  description: string;
  repoLink?: string;
  demoLink?: string;
  routePath?: string;
  stack: string[];
  visible: boolean;
};

export type Projects = Project[];
