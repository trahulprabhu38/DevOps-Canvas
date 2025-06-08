
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, ApiProject, CreateProjectRequest } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => apiService.getProjects(),
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => apiService.getProject(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (project: CreateProjectRequest) => apiService.createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project Created!",
        description: "Your project has been successfully added to the portfolio.",
      });
    },
    onError: (error) => {
      console.error('Create project error:', error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive"
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, project }: { id: string; project: Partial<CreateProjectRequest> }) =>
      apiService.updateProject(id, project),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      toast({
        title: "Project Updated!",
        description: "Your project has been successfully updated.",
      });
    },
    onError: (error) => {
      console.error('Update project error:', error);
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive"
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project Deleted!",
        description: "Your project has been successfully deleted.",
      });
    },
    onError: (error) => {
      console.error('Delete project error:', error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive"
      });
    },
  });
};
