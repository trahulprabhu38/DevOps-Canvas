
import { ApiProject } from '@/services/api';
import { Project } from '@/data/mockData';

export const mapApiProjectToProject = (apiProject: ApiProject): Project => {
  return {
    id: apiProject._id,
    name: apiProject.name,
    description: apiProject.description,
    tags: apiProject.tags,
    githubUrl: apiProject.githubUrl,
    demoUrl: apiProject.demoUrl,
    mediumUrl: apiProject.mediumUrl,
    imageUrl: apiProject.imageUrl,
    detailedDescription: apiProject.detailedDescription,
    features: apiProject.features,
    techStack: apiProject.techStack || apiProject.tags,
    challenges: apiProject.challenges || [],
    outcomes: apiProject.outcomes || [],
  };
};
