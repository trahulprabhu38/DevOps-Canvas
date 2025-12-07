import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, FolderPlus, FileText, Github } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-purple-800/50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              T Rahul Prabhu
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant={isActive('/') ? 'default' : 'ghost'}
              className={isActive('/') ? 'bg-purple-700 hover:bg-purple-600' : 'text-gray-300 hover:text-white hover:bg-gray-800'}
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive('/add-project') ? 'default' : 'ghost'}
              className={isActive('/add-project') ? 'bg-purple-700 hover:bg-purple-600' : 'text-gray-300 hover:text-white hover:bg-gray-800'}
            >
              <Link to="/add-project">
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Project
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive('/revision-notes') ? 'default' : 'ghost'}
              className={isActive('/revision-notes') ? 'bg-purple-700 hover:bg-purple-600' : 'text-gray-300 hover:text-white hover:bg-gray-800'}
            >
              <Link to="/revision-notes">
                <FileText className="h-4 w-4 mr-2" />
                Revision Notes
              </Link>
            </Button>

            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hidden md:flex"
              onClick={() => window.open('https://github.com/trahulprabhu38', '_blank')}
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
