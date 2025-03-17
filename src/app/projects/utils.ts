import { Projects } from './types';

export const getCachedProjects = (itemId: string | null) => {
  const suffix = itemId ?? '';
  const ttl = localStorage.getItem(`projectsTTL${suffix}`);
  if (ttl) {
    const dateTTL = new Date(ttl);
    dateTTL.setDate(dateTTL.getDate() + 7);
    const todaysDate = new Date();
    // if the today's date is less than the moment ttl was set plus 7 days, then the ttl should be refreshed
    if (dateTTL > todaysDate) {
      const storedProjects = localStorage.getItem(`projects${suffix}`);
      if (storedProjects) {
        return JSON.parse(storedProjects);
      }
    }
  }
  return [];
};

export const setCachedProjects = (
  itemId: string | null,
  projects: Projects
) => {
  const suffix = itemId ?? '';
  localStorage.setItem(`projects${suffix}`, JSON.stringify(projects));
  localStorage.setItem(`projectsTTL${suffix}`, new Date().toString());
};
