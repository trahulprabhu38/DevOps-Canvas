import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService, PdfNote, UploadPdfRequest } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const usePdfNotes = () => {
  return useQuery({
    queryKey: ['pdfNotes'],
    queryFn: () => apiService.getPdfNotes(),
  });
};

export const usePdfNote = (id: string) => {
  return useQuery({
    queryKey: ['pdfNote', id],
    queryFn: () => apiService.getPdfNote(id),
    enabled: !!id,
  });
};

export const useUploadPdfNote = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UploadPdfRequest) => apiService.uploadPdfNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pdfNotes'] });
      toast({
        title: 'Success',
        description: 'PDF uploaded successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload PDF',
        variant: 'destructive',
      });
    },
  });
};
