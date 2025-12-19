import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import { Shield, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = ({ token }) => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('lost');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          axios.get('http://localhost:5000/api/lost', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/found', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setLostItems(lostRes.data);
        setFoundItems(foundRes.data);
      } catch (error) {
        toast.error('Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const approveLost = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/lost/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Lost item approved!');
      // Refresh lost items
      const lostRes = await axios.get('http://localhost:5000/api/lost', { headers: { Authorization: `Bearer ${token}` } });
      setLostItems(lostRes.data);
    } catch (error) {
      console.error('Approval error:', error);
      toast.error(error.response?.data?.error || 'Failed to approve item');
    }
  };

  const approveFound = async (id, matchedLostId) => {
    try {
      await axios.put(`http://localhost:5000/api/found/${id}/approve`, { matchedLostId }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Found item approved!');
      // Refresh both lists
      const [lostRes, foundRes] = await Promise.all([
        axios.get('http://localhost:5000/api/lost', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/found', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setLostItems(lostRes.data);
      setFoundItems(foundRes.data);
    } catch (error) {
      console.error('Approval error:', error);
      toast.error(error.response?.data?.error || 'Failed to approve item');
    }
  };

  const handleApproveFound = (id) => {
    const matchedId = prompt('Enter matching Lost Item ID (optional):');
    approveFound(id, matchedId || undefined);
  };

  const markCollected = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/lost/${id}/collected`, {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Item marked as collected!');
      // Refresh lost items
      const lostRes = await axios.get('http://localhost:5000/api/lost', { headers: { Authorization: `Bearer ${token}` } });
      setLostItems(lostRes.data);
    } catch (error) {
      console.error('Mark collected error:', error);
      toast.error(error.response?.data?.error || 'Failed to mark as collected');
    }
  };

  const filteredLostItems = lostItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFoundItems = foundItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingLostItems = filteredLostItems.filter(item => item.status === 'pending');
  const pendingFoundItems = filteredFoundItems.filter(item => item.status === 'pending');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <p className="text-gray-600">Manage and approve lost and found items</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Lost</p>
              <p className="text-2xl font-bold text-gray-900">{pendingLostItems.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Found</p>
              <p className="text-2xl font-bold text-gray-900">{pendingFoundItems.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Search className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Lost</p>
              <p className="text-2xl font-bold text-gray-900">{lostItems.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Found</p>
              <p className="text-2xl font-bold text-gray-900">{foundItems.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('lost')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'lost'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Lost Items ({filteredLostItems.length})
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'found'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Found Items ({filteredFoundItems.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'lost' ? (
          <ItemList 
            items={filteredLostItems} 
            onApprove={approveLost}
            onCollected={markCollected}
            isAdmin={true} 
            type="lost" 
          />
        ) : (
          <ItemList 
            items={filteredFoundItems} 
            onApprove={handleApproveFound} 
            isAdmin={true} 
            type="found" 
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;