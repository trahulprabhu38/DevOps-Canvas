import React, { useState, useEffect } from 'react';
import { FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';

interface PdfMetadata {
  id: string;
  title: string;
  description: string;
  filename: string;
  tags: string[];
}

interface SelectedPdf extends PdfMetadata {
  pdfUrl: string;
}

const RevisionNotes: React.FC = () => {
  const [pdfList, setPdfList] = useState<PdfMetadata[]>([]);
  const [filteredPdfs, setFilteredPdfs] = useState<PdfMetadata[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<SelectedPdf | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/uploads/pdfs/pdfs.json')
      .then(res => res.json())
      .then(data => {
        setPdfList(data);
        setFilteredPdfs(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch PDFs:', err);
        setIsLoading(false);
      });
  }, []);

  const allTags = Array.from(new Set(pdfList.flatMap(pdf => pdf.tags)));

  useEffect(() => {
    let filtered = pdfList;

    if (searchTerm) {
      filtered = filtered.filter(pdf =>
        pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(pdf =>
        selectedTags.some(tag => pdf.tags.includes(tag))
      );
    }

    setFilteredPdfs(filtered);
  }, [searchTerm, selectedTags, pdfList]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handlePdfClick = (pdf: PdfMetadata) => {
    setSelectedPdf({
      ...pdf,
      pdfUrl: `http://localhost:3001/uploads/pdfs/${pdf.filename}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-300 mb-4 tracking-wide">
            <FileText className="inline-block h-12 w-12 mr-3 mb-2" />
            Revision Notes
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Your collection of study materials and revision notes. Add PDFs to <code className="bg-gray-800 px-2 py-1 rounded text-purple-300">/server/uploads/pdfs/</code> and edit <code className="bg-gray-800 px-2 py-1 rounded text-purple-300">pdfs.json</code> to add metadata.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search revision notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800/50 border-purple-700 text-white placeholder-gray-400 pl-10"
              />
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'border-purple-700 text-purple-300 hover:bg-purple-900/50'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* PDF Grid */}
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
              <p className="text-slate-400 mt-4">Loading PDFs...</p>
            </div>
          ) : filteredPdfs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPdfs.map(pdf => (
                <div
                  key={pdf.id}
                  onClick={() => handlePdfClick(pdf)}
                  className="cursor-pointer bg-gray-800/80 border-2 border-purple-700 rounded-xl shadow-xl p-6 transition-all hover:scale-105 hover:border-purple-400 hover:shadow-purple-500/50 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="h-7 w-7 text-purple-400 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl text-purple-100 mb-2 line-clamp-2">
                        {pdf.title}
                      </h3>
                      <p className="text-slate-300 text-sm line-clamp-3 min-h-[3.75rem]">
                        {pdf.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {pdf.tags && pdf.tags.length > 0 ? (
                      pdf.tags.map((tag, i) => (
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
            <div className="text-center py-16 border-2 border-dashed border-purple-700 rounded-xl bg-gray-800/30">
              <FileText className="h-20 w-20 text-purple-700 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-purple-300 mb-2">
                {searchTerm || selectedTags.length > 0 ? 'No PDFs found' : 'No PDFs yet'}
              </h3>
              <p className="text-slate-400 mb-4">
                {searchTerm || selectedTags.length > 0
                  ? 'Try adjusting your search or filters'
                  : 'Add your PDFs and edit pdfs.json to get started!'}
              </p>
              {!searchTerm && selectedTags.length === 0 && (
                <div className="max-w-md mx-auto mt-6 text-left bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-slate-300 mb-2">To add PDFs:</p>
                  <ol className="text-sm text-slate-400 list-decimal list-inside space-y-1">
                    <li>Copy your PDF to <code className="bg-gray-800 px-1 rounded">/server/uploads/pdfs/</code></li>
                    <li>Edit <code className="bg-gray-800 px-1 rounded">pdfs.json</code> in the same folder</li>
                    <li>Add metadata: title, description, filename, tags</li>
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PDF Viewer Modal - Fullscreen */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Close Button - Top Right */}
          <button
            onClick={() => setSelectedPdf(null)}
            className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
            aria-label="Close PDF viewer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* PDF Title - Top Left */}
          <div className="absolute top-4 left-4 z-50 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
            <h2 className="text-white font-semibold text-lg">{selectedPdf.title}</h2>
          </div>

          {/* PDF Container - Fullscreen */}
          <div className="w-full h-full">
            <iframe
              src={selectedPdf.pdfUrl}
              className="w-full h-full border-0"
              title={selectedPdf.title}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RevisionNotes;
