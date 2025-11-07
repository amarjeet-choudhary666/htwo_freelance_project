import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  categoryId?: number;
  categoryTypeId?: number;
  category?: {
    id: number;
    name: string;
  };
  categoryType?: {
    id: number;
    name: string;
  };
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  imageUrl: string;
  features: string[];
  status: string;
  priority: string;
  ram: string;
  storage: string;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
}

interface CategoryType {
  id: number;
  name: string;
}

interface ServiceFormData {
  name: string;
  categoryId: string;
  categoryTypeId: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  imageUrl: string;
  features: string[];
  ram: string;
  storage: string;
  priority: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  // const [users, setUsers] = useState<any[]>([]);

  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    categoryId: '',
    categoryTypeId: '',
    description: '',
    monthlyPrice: '',
    yearlyPrice: '',
    imageUrl: '',
    features: [],
    ram: '',
    storage: '',
    priority: 'LOW'
  });

  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    fetchServices();
    fetchCategories();
    // fetchUsers();
  }, [searchTerm, categoryFilter, statusFilter]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/v1/admin/categories', {
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        setCategories(data.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCategoryTypes = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/v1/admin/categories/${categoryId}/types`, {
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        setCategoryTypes(data.data);
      }
    } catch (error) {
      console.error('Error fetching category types:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (categoryFilter) params.append('category', categoryFilter);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/v1/admin/services?${params}`, {
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        setServices(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch('/api/v1/admin/users', {
  //       credentials: 'include'
  //     });
  //     const data = await response.json();

  //     if (data.success) {
  //       setUsers(data.data || []);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //     setUsers([]);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingService 
        ? `/api/v1/admin/services/${editingService.id}`
        : '/api/v1/admin/services';
      
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowForm(false);
        setEditingService(null);
        resetForm();
        fetchServices();
      } else {
        alert(data.message || 'Error saving service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      categoryId: service.categoryId?.toString() || '',
      categoryTypeId: service.categoryTypeId?.toString() || '',
      description: service.description || '',
      monthlyPrice: service.monthlyPrice?.toString() || '',
      yearlyPrice: service.yearlyPrice?.toString() || '',
      imageUrl: service.imageUrl || '',
      features: service.features || [],
      ram: service.ram || '',
      storage: service.storage || '',
      priority: service.priority || 'LOW'
    });

    // Load category types if category is selected
    if (service.categoryId) {
      fetchCategoryTypes(service.categoryId.toString());
    }

    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/v1/admin/services/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        fetchServices();
      } else {
        alert(data.message || 'Error deleting service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      categoryId: '',
      categoryTypeId: '',
      description: '',
      monthlyPrice: '',
      yearlyPrice: '',
      imageUrl: '',
      features: [],
      ram: '',
      storage: '',
      priority: 'LOW'
    });
    setNewFeature('');
    setCategoryTypes([]);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  if (loading && services.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
        <button
          onClick={() => {
            resetForm();
            setEditingService(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="hosting">Hosting</option>
            <option value="cloud">Cloud</option>
            <option value="vps">VPS</option>
            <option value="dedicated">Dedicated</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pricing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {service.imageUrl && (
                        <img
                          className="h-10 w-10 rounded-lg mr-3"
                          src={service.imageUrl}
                          alt={service.name}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {service.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.description?.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {service.category?.name || 'No Category'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      {service.monthlyPrice && (
                        <div>Monthly: ₹{service.monthlyPrice}</div>
                      )}
                      {service.yearlyPrice && (
                        <div>Yearly: ₹{service.yearlyPrice}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.owner?.firstname || service.owner?.email || 'N/A'}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => {
                        const categoryId = e.target.value;
                        setFormData(prev => ({ ...prev, categoryId, categoryTypeId: '' }));
                        if (categoryId) {
                          fetchCategoryTypes(categoryId);
                        } else {
                          setCategoryTypes([]);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Type
                    </label>
                    <select
                      value={formData.categoryTypeId}
                      onChange={(e) => setFormData(prev => ({ ...prev, categoryTypeId: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!formData.categoryId}
                    >
                      <option value="">Select Category Type</option>
                      {categoryTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.monthlyPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, monthlyPrice: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Yearly Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.yearlyPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, yearlyPrice: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      RAM (GB)
                    </label>
                    <input
                      type="text"
                      value={formData.ram}
                      onChange={(e) => setFormData(prev => ({ ...prev, ram: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Storage
                    </label>
                    <input
                      type="text"
                      value={formData.storage}
                      onChange={(e) => setFormData(prev => ({ ...prev, storage: e.target.value }))}
                      placeholder="e.g., 100GB SSD"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner *
                  </label>
                  <select
                    required
                    value={formData.ownerId}
                    onChange={(e) => setFormData(prev => ({ ...prev, ownerId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Owner</option>
                    {users && users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstname || user.email}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingService(null);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editingService ? 'Update' : 'Create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;