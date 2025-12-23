import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Github, ExternalLink, Filter, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProjectCard from '@/components/ProjectCard';
import { useProjects } from '@/hooks/useProjects';
import { mapApiProjectToProject } from '@/utils/projectMapper';
import { Project } from '@/data/mockData';
import Navbar from '@/components/Navbar';

const Index = () => {
  const { data: apiProjects, isLoading, error } = useProjects();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [displayText, setDisplayText] = useState('');
  
  const fullText = "DevOps Engineer & Full-Stack Developer";
  
  // Map API projects to frontend format
  useEffect(() => {
    if (apiProjects) {
      setProjects(apiProjects);
    }
  }, [apiProjects]);

  // Typing animation effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  // Get all unique tags
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

  // Filter projects
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.some(tag => project.tags.includes(tag))
      );
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedTags, projects]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">Error Loading Projects</h1>
          <p className="text-gray-400 mb-4">Please make sure your backend server is running.</p>
          <p className="text-sm text-gray-500">Expected API at: {process.env.VITE_API_URL || 'http://185.197.251.236/api'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl" />
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent animate-fade-in">
                Hi, I'm T Rahul Prabhu
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 font-light min-h-[2.5rem]">
                {displayText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              4th-year Engineering Student passionate about DevOps, Cloud Infrastructure, 
              and building scalable solutions. Explore my projects and journey.
            </p>
            
            <div className="flex gap-4 justify-center animate-fade-in flex-wrap">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                <Link to="/add-project">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Project
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                <Link to="/revision-notes">
                  <FileText className="mr-2 h-5 w-5" />
                  Revision Notes
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-300"
                onClick={() => window.open('https://github.com/trahulprabhu38', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                View GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white">Featured Projects</h2>
            <p className="text-gray-400 text-lg">A showcase of my DevOps and engineering work</p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-6">
            <div className="max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 backdrop-blur-sm"
              />
            </div>

            {/* Tag Filters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filter by technology:</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "secondary"}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      selectedTags.includes(tag)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.filter(project => {
                if (!project.id) {
                  console.warn('Project with missing id:', project);
                  return false;
                }
                return true;
              }).map((project, index) => (
                <div key={project.id}>
                  <ProjectCard 
                    project={project} 
                    index={index}
                  />
                  <div className="text-lg font-semibold text-white text-center mt-2">
                    {project.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredProjects.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
