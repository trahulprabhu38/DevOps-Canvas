const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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
  techStack: string[];
  challenges: string[];
  outcomes: string[];
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

export interface PdfNote {
  _id: string;
  title: string;
  description?: string;
  pdfUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UploadPdfRequest {
  title: string;
  description?: string;
  tags: string[];
  pdfFile: File;
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

  async getPdfNotes(): Promise<PdfNote[]> {
    return this.request<PdfNote[]>('/pdf-notes');
  }

  async getPdfNote(id: string): Promise<PdfNote> {
    return this.request<PdfNote>(`/pdf-notes/${id}`);
  }

  async uploadPdfNote(data: UploadPdfRequest): Promise<PdfNote> {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) {
      formData.append('description', data.description);
    }
    formData.append('tags', JSON.stringify(data.tags));
    formData.append('pdf', data.pdfFile);

    const url = `${API_BASE_URL}/pdf-notes/upload`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiService = new ApiService();
