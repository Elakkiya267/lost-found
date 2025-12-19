import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import { Search, Plus, TrendingUp, Package } from 'lucide-react';
import toast from 'react-hot-toast';

const UserDashboard = ({ token, role }) => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const markCollected = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/lost/${id}/collected`, {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Item marked as collected!');
      // Refresh the data
      const lostRes = await axios.get('http://localhost:5000/api/lost', { headers: { Authorization: `Bearer ${token}` } });
      setLostItems(lostRes.data);
    } catch (error) {
      toast.error('Failed to mark item as collected');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage lost and found items in your community</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Search className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Lost Items</p>
              <p className="text-2xl font-bold text-gray-900">{lostItems.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Found Items</p>
              <p className="text-2xl font-bold text-gray-900">{foundItems.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{lostItems.length + foundItems.length}</p>
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

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Lost Items Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Lost Items</h2>
            <div className="text-sm text-gray-500">
              {filteredLostItems.length} items
            </div>
          </div>
          <ItemList 
            items={filteredLostItems} 
            onCollected={markCollected} 
            isAdmin={false} 
            type="lost" 
          />
        </div>

        {/* Found Items Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Found Items</h2>
            <div className="text-sm text-gray-500">
              {filteredFoundItems.length} items
            </div>
          </div>
          <ItemList 
            items={filteredFoundItems} 
            isAdmin={false} 
            type="found" 
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;