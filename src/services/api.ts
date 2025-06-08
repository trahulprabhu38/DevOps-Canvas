
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';

export interface CreateProjectRequest {
  name: string;
  description: string;
  detailedDescription: string;
  githubUrl?: string;
  demoUrl?: string;
  mediumUrl?: string;
  imageUrl: string;
  tags: string[];
  features: string[];
}

export interface ApiProject {
  _id: string;
  name: string;
  description: string;
  detailedDescription: string;
  githubUrl?: string;
  demoUrl?: string;
  mediumUrl?: string;
  imageUrl: string;
  tags: string[];
  features: string[];
  techStack: string[];
  challenges: string[];
  outcomes: string[];
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getProjects(): Promise<ApiProject[]> {
    return this.request<ApiProject[]>('/projects');
  }

  async getProject(id: string): Promise<ApiProject> {
    return this.request<ApiProject>(`/projects/${id}`);
  }

  async createProject(project: CreateProjectRequest): Promise<ApiProject> {
    return this.request<ApiProject>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: string, project: Partial<CreateProjectRequest>): Promise<ApiProject> {
    return this.request<ApiProject>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: string): Promise<void> {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
