import { Link } from 'react-router-dom';
import { Search, Plus, User, LogOut, Shield } from 'lucide-react';

const Navbar = ({ role, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Search className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Lost & Found</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/report-lost" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Report Lost</span>
            </Link>
            <Link to="/report-found" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Report Found</span>
            </Link>
            {role === 'admin' && (
              <Link to="/admin" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <User className="h-5 w-5" />
              <span className="text-sm capitalize">{role}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;