import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useProject, useUpdateProject } from '@/hooks/useProjects';
import Navbar from '@/components/Navbar';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading } = useProject(id!);
  const updateProjectMutation = useUpdateProject();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    detailedDescription: '',
    githubUrl: '',
    demoUrl: '',
    mediumUrl: '',
    imageUrl: ''
  });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [currentTech, setCurrentTech] = useState('');
  const [challenges, setChallenges] = useState<string[]>(['']);
  const [outcomes, setOutcomes] = useState<string[]>(['']);
  const [documentation, setDocumentation] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        detailedDescription: project.detailedDescription || '',
        githubUrl: project.githubUrl || '',
        demoUrl: project.demoUrl || '',
        mediumUrl: project.mediumUrl || '',
        imageUrl: project.imageUrl || ''
      });
      setTags(project.tags || []);
      setFeatures(project.features && project.features.length ? project.features : ['']);
      setTechStack(project.techStack || []);
      setChallenges(project.challenges && project.challenges.length ? project.challenges : ['']);
      setOutcomes(project.outcomes && project.outcomes.length ? project.outcomes : ['']);
      setDocumentation(project.documentation || '');
    }
  }, [project]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag('');
    }
  };
  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };
  const addFeature = () => {
    setFeatures(prev => [...prev, '']);
  };
  const updateFeature = (index: number, value: string) => {
    setFeatures(prev => prev.map((feature, i) => i === index ? value : feature));
  };
  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };
  const addTech = () => {
    if (currentTech.trim() && !techStack.includes(currentTech.trim())) {
      setTechStack(prev => [...prev, currentTech.trim()]);
      setCurrentTech('');
    }
  };
  const removeTech = (techToRemove: string) => {
    setTechStack(prev => prev.filter(tech => tech !== techToRemove));
  };
  const addChallenge = () => {
    setChallenges(prev => [...prev, '']);
  };
  const updateChallenge = (index: number, value: string) => {
    setChallenges(prev => prev.map((challenge, i) => i === index ? value : challenge));
  };
  const removeChallenge = (index: number) => {
    setChallenges(prev => prev.filter((_, i) => i !== index));
  };
  const addOutcome = () => {
    setOutcomes(prev => [...prev, '']);
  };
  const updateOutcome = (index: number, value: string) => {
    setOutcomes(prev => prev.map((outcome, i) => i === index ? value : outcome));
  };
  const removeOutcome = (index: number) => {
    setOutcomes(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredFeatures = features.filter(feature => feature.trim() !== '');
    const projectData = {
      ...formData,
      tags,
      features: filteredFeatures,
      techStack,
      challenges: challenges.filter(c => c.trim() !== ''),
      outcomes: outcomes.filter(o => o.trim() !== ''),
      documentation,
    };
    try {
      await updateProjectMutation.mutateAsync({ id: id!, project: projectData });
      navigate('/');
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-400 py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Edit Project
            </h1>
            <p className="text-gray-400 text-lg">
              Update your project details
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Project Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="Enter project name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-gray-300">Image URL</Label>
                  <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="https://example.com/image.jpg" />
                </div>
              </div>
              <div className="space-y-2 mt-6">
                <Label htmlFor="description" className="text-gray-300">Short Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required rows={3} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="Brief description for the project card" />
              </div>
              <div className="space-y-2 mt-6">
                <Label htmlFor="detailedDescription" className="text-gray-300">Detailed Description</Label>
                <Textarea id="detailedDescription" name="detailedDescription" value={formData.detailedDescription} onChange={handleInputChange} rows={5} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="Comprehensive project description for the detail page" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Links & Technologies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="githubUrl" className="text-gray-300">GitHub URL</Label>
                  <Input id="githubUrl" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="https://github.com/username/repo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demoUrl" className="text-gray-300">Demo URL</Label>
                  <Input id="demoUrl" name="demoUrl" value={formData.demoUrl} onChange={handleInputChange} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="https://demo.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mediumUrl" className="text-gray-300">Medium Article URL</Label>
                  <Input id="mediumUrl" name="mediumUrl" value={formData.mediumUrl} onChange={handleInputChange} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="https://medium.com/@username/article" />
                </div>
              </div>
              {/* Tags */}
              <div className="space-y-4">
                <Label className="text-gray-300">Technologies & Tags</Label>
                <div className="flex gap-2">
                  <Input value={currentTag} onChange={(e) => setCurrentTag(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 flex-1" placeholder="Add technology tag (e.g., Docker, AWS)" />
                  <Button type="button" onClick={addTag} className="bg-purple-600 hover:bg-purple-700"><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag} className="bg-gray-700 text-gray-300 flex items-center gap-1">{tag}<button type="button" onClick={() => removeTag(tag)}><X className="h-3 w-3" /></button></Badge>
                  ))}
                </div>
              </div>
            </div>
            {/* Tech Stack */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Tech Stack</h2>
              <div className="space-y-4">
                <Label className="text-gray-300">Tech Stack</Label>
                <div className="flex gap-2">
                  <Input value={currentTech} onChange={(e) => setCurrentTech(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 flex-1" placeholder="Add tech (e.g., React, Node.js)" />
                  <Button type="button" onClick={addTech} className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map(tech => (
                    <Badge key={tech} className="bg-gray-700 text-gray-300 flex items-center gap-1">{tech}<button type="button" onClick={() => removeTech(tech)}><X className="h-3 w-3" /></button></Badge>
                  ))}
                </div>
              </div>
            </div>
            {/* Key Features */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={feature} onChange={(e) => updateFeature(index, e.target.value)} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 flex-1" placeholder="Describe a key feature" />
                    {features.length > 1 && (<Button type="button" variant="ghost" onClick={() => removeFeature(index)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20"><X className="h-4 w-4" /></Button>)}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addFeature} className="border-gray-600 text-gray-300 hover:bg-gray-700/50"><Plus className="h-4 w-4 mr-2" />Add Feature</Button>
              </div>
            </div>
            {/* Challenges */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mt-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Technical Challenges</h2>
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={challenge} onChange={(e) => updateChallenge(index, e.target.value)} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 flex-1" placeholder="Describe a technical challenge" />
                    {challenges.length > 1 && (<Button type="button" variant="ghost" onClick={() => removeChallenge(index)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20"><X className="h-4 w-4" /></Button>)}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addChallenge} className="border-gray-600 text-gray-300 hover:bg-gray-700/50"><Plus className="h-4 w-4 mr-2" />Add Challenge</Button>
              </div>
            </div>
            {/* Outcomes */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mt-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Outcomes & Impact</h2>
              <div className="space-y-4">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={outcome} onChange={(e) => updateOutcome(index, e.target.value)} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 flex-1" placeholder="Describe an outcome or impact" />
                    {outcomes.length > 1 && (<Button type="button" variant="ghost" onClick={() => removeOutcome(index)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20"><X className="h-4 w-4" /></Button>)}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addOutcome} className="border-gray-600 text-gray-300 hover:bg-gray-700/50"><Plus className="h-4 w-4 mr-2" />Add Outcome</Button>
              </div>
            </div>
            {/* Documentation */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mt-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Documentation</h2>
              <Textarea id="documentation" name="documentation" value={documentation} onChange={(e) => setDocumentation(e.target.value)} rows={5} className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" placeholder="Paste documentation, notes, or a README link here" />
            </div>
            <div className="flex justify-center">
              <Button type="submit" disabled={updateProjectMutation.isPending} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105">
                {updateProjectMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject; 