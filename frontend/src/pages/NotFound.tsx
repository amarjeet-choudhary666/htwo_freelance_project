import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-6">
      <div className="text-center text-white max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            404
          </h1>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-lg px-8 py-4">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;