import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { usePdfNotes, useUploadPdfNote } from '@/hooks/usePdfNotes';
import PdfViewer from '@/components/PdfViewer';
import { PdfNote } from '@/services/api';
import { FileText, Upload, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddPDF: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<PdfNote | null>(null);

  const { data: pdfNotes, isLoading } = usePdfNotes();
  const uploadMutation = useUploadPdfNote();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) return;

    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

    await uploadMutation.mutateAsync({
      title,
      description,
      tags: tagsArray,
      pdfFile,
    });

    setTitle('');
    setDescription('');
    setTags('');
    setPdfFile(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4 bg-gray-800 border-purple-700 text-purple-300 hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-300 mb-2 tracking-wide">
            <FileText className="inline-block h-10 w-10 mr-3 mb-2" />
            PDF Revision Notes
          </h1>
          <p className="text-slate-400 text-lg">Upload and manage your study materials and revision notes</p>
        </div>

        {/* Upload Form */}
        <div className="bg-gray-900/80 rounded-2xl shadow-2xl p-8 mb-8 border border-purple-800">
          <h2 className="text-2xl font-bold text-purple-200 mb-6 flex items-center">
            <Upload className="h-6 w-6 mr-2" />
            Upload New PDF
          </h2>
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-300 text-base">Title</Label>
                <Input
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="bg-gray-800 border-purple-700 text-slate-100"
                  placeholder="e.g. OpenSSL Certification Notes"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-base">Tags (comma-separated)</Label>
                <Input
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  className="bg-gray-800 border-purple-700 text-slate-100"
                  placeholder="e.g. certification, openssl, security"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300 text-base">Description</Label>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                className="bg-gray-800 border-purple-700 text-slate-100"
                placeholder="Brief description of the content..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300 text-base">PDF File</Label>
              <Input
                type="file"
                accept="application/pdf"
                required
                onChange={e => setPdfFile(e.target.files?.[0] ?? null)}
                className="bg-gray-800 border-purple-700 text-slate-100 file:bg-purple-700 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md file:mr-4 hover:file:bg-purple-600"
              />
            </div>
            <Button
              type="submit"
              disabled={uploadMutation.isPending}
              className="w-full bg-purple-700 hover:bg-purple-600 text-lg py-6 rounded-xl transition-all"
            >
              {uploadMutation.isPending ? 'Uploading...' : 'Upload PDF'}
            </Button>
          </form>
        </div>

        {/* PDF Library */}
        <div className="bg-gray-900/80 rounded-2xl shadow-2xl p-8 border border-purple-800">
          <h2 className="text-2xl font-bold text-purple-200 mb-6">Your PDF Library</h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
              <p className="text-slate-400 mt-4">Loading PDFs...</p>
            </div>
          ) : pdfNotes && pdfNotes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pdfNotes.map(note => (
                <div
                  key={note._id}
                  onClick={() => setSelectedPdf(note)}
                  className="cursor-pointer bg-gray-800 border-2 border-purple-700 rounded-xl shadow-xl p-5 transition-all hover:scale-105 hover:border-purple-400 hover:shadow-purple-500/50"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-purple-100 mb-1 truncate">{note.title}</h3>
                      <p className="text-slate-300 text-sm line-clamp-2 min-h-[2.5rem]">
                        {note.description || 'No description'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {note.tags && note.tags.length > 0 ? (
                      note.tags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="bg-purple-600/30 border border-purple-700 rounded-full px-3 py-1 text-xs text-purple-100"
                        >
                          #{tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">No tags</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-purple-700 rounded-xl">
              <FileText className="h-16 w-16 text-purple-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-300 mb-2">No PDFs yet</h3>
              <p className="text-slate-400">Upload your first PDF to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <PdfViewer pdfNote={selectedPdf} onClose={() => setSelectedPdf(null)} />
      )}
    </div>
  );
};

export default AddPDF;
