import { MapPin, Mail, Phone, CheckCircle, Clock, Package } from 'lucide-react';

const ItemList = ({ items, onApprove, onCollected, isAdmin, type }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'found': return 'bg-blue-100 text-blue-800';
      case 'collected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'found': return <Package className="h-4 w-4" />;
      case 'collected': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          {/* Image */}
          {item.imageUrl && (
            <div className="w-full h-48 bg-gray-100 rounded-t-xl overflow-hidden">
              <img 
                src={`http://localhost:5000${item.imageUrl}`} 
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                {isAdmin && <p className="text-xs text-gray-500 font-mono">ID: {item._id}</p>}
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
                <span className="ml-1 capitalize">{item.status}</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

            {/* Details */}
            <div className="space-y-2 mb-4">
              {type === 'found' && item.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{item.location}</span>
                </div>
              )}
              
              {item.userId && (
                <div className="space-y-1">
                  {item.userId.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{item.userId.email}</span>
                    </div>
                  )}
                  {item.userId.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{item.userId.phone}</span>
                    </div>
                  )}
                </div>
              )}

              {item.foundDetails && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-1">Found Details</p>
                  <p className="text-sm text-blue-700">
                    Found by {item.foundDetails.name} at {item.foundDetails.location}
                  </p>
                </div>
              )}

              {item.matchedLostId && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-900 mb-1">Matched Item</p>
                  <p className="text-sm text-green-700">{item.matchedLostId.name}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {isAdmin && item.status === 'pending' && (
                <button 
                  onClick={() => onApprove(item._id)}
                  className="flex-1 btn-primary text-sm py-2"
                >
                  Approve
                </button>
              )}
              {!isAdmin && type === 'lost' && item.status === 'found' && (
                <button 
                  onClick={() => onCollected(item._id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                  Mark Collected
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;