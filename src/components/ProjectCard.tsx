
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/data/mockData';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] animate-fade-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map(tag => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="bg-gray-700/50 text-gray-300 text-xs hover:bg-purple-600/30 transition-colors duration-200"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="secondary" className="bg-gray-700/50 text-gray-300 text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <Button 
            asChild 
            variant="ghost" 
            size="sm"
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-600/20 transition-all duration-200"
          >
            <Link to={`/project/${project.id}`}>
              View Details
            </Link>
          </Button>
          
          <div className="flex gap-2">
            {project.githubUrl && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.mediumUrl && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
              >
                <a href={project.mediumUrl} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-emerald-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-emerald-600/10 transition-all duration-500 pointer-events-none" />
    </div>
  );
};

export default ProjectCard;
