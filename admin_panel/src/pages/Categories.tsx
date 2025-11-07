import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ChevronDown, ChevronRight } from 'lucide-react';

interface CategoryType {
  id: number;
  name: string;
  categoryId: number;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  categoryTypes: CategoryType[];
}

interface CategoryFormData {
  name: string;
  description: string;
}

interface CategoryTypeFormData {
  name: string;
  categoryId: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showTypeForm, setShowTypeForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingType, setEditingType] = useState<CategoryType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

  const [categoryFormData, setCategoryFormData] = useState<CategoryFormData>({
    name: '',
    description: ''
  });

  const [typeFormData, setTypeFormData] = useState<CategoryTypeFormData>({
    name: '',
    categoryId: 0
  });

  useEffect(() => {
    fetchCategories();
  }, [searchTerm]);

  const fetchCategories = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/v1/admin/categories?${params}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingCategory 
        ? `/api/v1/admin/categories/${editingCategory.id}`
        : '/api/v1/admin/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(categoryFormData),
      });

      const data = await response.json();

      if (data.success) {
        setShowCategoryForm(false);
        setEditingCategory(null);
        resetCategoryForm();
        fetchCategories();
      } else {
        alert(data.message || 'Error saving category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingType
        ? `/api/v1/admin/category-types/${editingType.id}`
        : `/api/v1/admin/categories/${typeFormData.categoryId}/types`;

      const method = editingType ? 'PUT' : 'POST';

      const requestBody = editingType
        ? { name: typeFormData.name }
        : { name: typeFormData.name, categoryId: typeFormData.categoryId };

      console.log('Sending request:', { url, method, body: requestBody });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (data.success) {
        setShowTypeForm(false);
        setEditingType(null);
        resetTypeForm();
        fetchCategories();
      } else {
        alert(data.message || 'Error saving category type');
      }
    } catch (error) {
      console.error('Error saving category type:', error);
      alert('Error saving category type');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      description: category.description || ''
    });
    setShowCategoryForm(true);
  };

  const handleEditType = (type: CategoryType) => {
    setEditingType(type);
    setTypeFormData({
      name: type.name,
      categoryId: type.categoryId
    });
    setShowTypeForm(true);
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category? This will also delete all its types.')) return;

    try {
      const response = await fetch(`/api/v1/admin/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        fetchCategories();
      } else {
        alert(data.message || 'Error deleting category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const handleDeleteType = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category type?')) return;

    try {
      const response = await fetch(`/api/v1/admin/category-types/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        fetchCategories();
      } else {
        alert(data.message || 'Error deleting category type');
      }
    } catch (error) {
      console.error('Error deleting category type:', error);
      alert('Error deleting category type');
    }
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: '',
      description: ''
    });
  };

  const resetTypeForm = () => {
    setTypeFormData({
      name: '',
      categoryId: 0
    });
  };

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  if (loading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
        <button
          onClick={() => {
            resetCategoryForm();
            setEditingCategory(null);
            setShowCategoryForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {categories.map((category) => (
            <div key={category.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {expandedCategories.has(category.id) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {category.categoryTypes.length} types • Created {new Date(category.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      resetTypeForm();
                      setTypeFormData(prev => ({ ...prev, categoryId: category.id }));
                      setEditingType(null);
                      setShowTypeForm(true);
                    }}
                    className="text-green-600 hover:text-green-900 text-sm"
                  >
                    Add Type
                  </button>
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Category Types */}
              {expandedCategories.has(category.id) && category.categoryTypes.length > 0 && (
                <div className="mt-4 ml-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.categoryTypes.map((type) => (
                      <div
                        key={type.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-900">{type.name}</span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditType(type)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteType(type.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              
              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={categoryFormData.description}
                    onChange={(e) => setCategoryFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCategoryForm(false);
                      setEditingCategory(null);
                      resetCategoryForm();
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
                    {loading ? 'Saving...' : (editingCategory ? 'Update' : 'Create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Category Type Form Modal */}
      {showTypeForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingType ? 'Edit Category Type' : 'Add New Category Type'}
              </h3>
              
              <form onSubmit={handleTypeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={typeFormData.name}
                    onChange={(e) => setTypeFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {!editingType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      required
                      value={typeFormData.categoryId}
                      onChange={(e) => setTypeFormData(prev => ({ ...prev, categoryId: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={0}>Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTypeForm(false);
                      setEditingType(null);
                      resetTypeForm();
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
                    {loading ? 'Saving...' : (editingType ? 'Update' : 'Create')}
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

export default Categories;