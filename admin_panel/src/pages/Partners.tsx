import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { partnerAPI } from '../api/admin';

interface Partner {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  logoUrl: string;
  website: string;
  description: string;
  status: string;
  partnerType: string;
  createdAt: string;
}

interface PartnerFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  logoUrl: string;
  website: string;
  description: string;
  partnerType: string;
}

interface PartnerSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [partnerSummary, setPartnerSummary] = useState<PartnerSummary>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const [formData, setFormData] = useState<PartnerFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    logoUrl: '',
    website: '',
    description: '',
    partnerType: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, [searchTerm, statusFilter]);

  // Add useEffect to fetch all partners on component mount
  useEffect(() => {
    fetchPartners();
    fetchPartnerSummary();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await partnerAPI.getAll({
        search: searchTerm,
        status: statusFilter
      });

      if (response.success && response.data) {
        setPartners(response.data.partners || []);
      } else {
        console.error('API returned error:', response);
        setPartners([]);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPartnerSummary = async () => {
    try {
      const response = await partnerAPI.getAllWithStatus();

      if (response.success && response.data) {
        setPartnerSummary(response.data.summary);
      }
    } catch (error) {
      console.error('Error fetching partner summary:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploading(true);

    try {
      // Check for duplicate email before submitting
      if (!editingPartner) {
        try {
          const existingData = await partnerAPI.getAll();

          if (existingData.success && existingData.data && existingData.data.partners) {
            const emailExists = existingData.data.partners.some((partner: any) =>
              partner.email.toLowerCase() === formData.email.toLowerCase()
            );

            if (emailExists) {
              alert('A partner with this email already exists');
              setLoading(false);
              setUploading(false);
              return;
            }
          }
        } catch (error) {
          console.error('Error checking for duplicate email:', error);
        }
      }

      const formDataToSend = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value && key !== 'logoUrl') { // Skip logoUrl as we'll handle file separately
          formDataToSend.append(key, value);
        }
      });

      // Add file if selected
      if (selectedFile) {
        formDataToSend.append('logo', selectedFile);
      }

      let response;
      if (editingPartner) {
        response = await partnerAPI.update(editingPartner.id.toString(), formDataToSend);
      } else {
        response = await partnerAPI.create(formDataToSend);
      }

      if (response && response.success) {
        setShowForm(false);
        setEditingPartner(null);
        resetForm();
        fetchPartners();
        fetchPartnerSummary();
      } else {
        alert((response && response.message) || 'Error saving partner');
      }
    } catch (error) {
      console.error('Error saving partner:', error);
      alert('Error saving partner');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      email: partner.email,
      phone: partner.phone || '',
      company: partner.company || '',
      logoUrl: partner.logoUrl || '',
      website: partner.website || '',
      description: partner.description || '',
      partnerType: partner.partnerType || ''
    });
    setSelectedFile(null); // Clear file selection for edit
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      await partnerAPI.delete(id.toString());
      fetchPartners();
      fetchPartnerSummary();
    } catch (error) {
      console.error('Error deleting partner:', error);
      alert('Error deleting partner');
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await partnerAPI.updateStatus(id.toString(), status);
      fetchPartners();
      fetchPartnerSummary();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      logoUrl: '',
      website: '',
      description: '',
      partnerType: ''
    });
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // For preview, we can set a temporary URL
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, logoUrl: previewUrl }));
    } else {
      setSelectedFile(null);
      setFormData(prev => ({ ...prev, logoUrl: '' }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading && partners.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Partners Management</h1>
        <button
          onClick={() => {
            resetForm();
            setEditingPartner(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Partner
        </button>
      </div>

      {/* Partner Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <div className="h-6 w-6 bg-blue-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Partners</p>
              <p className="text-2xl font-bold text-gray-900">{partnerSummary.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <div className="h-6 w-6 bg-yellow-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{partnerSummary.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <div className="h-6 w-6 bg-green-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{partnerSummary.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <div className="h-6 w-6 bg-red-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{partnerSummary.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="text-sm text-gray-600">
            Showing {partners.length} partners
          </div>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No partners found
                  </td>
                </tr>
              ) : (
                partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {partner.logoUrl && (
                          <img
                            className="h-10 w-10 rounded-lg mr-3"
                            src={partner.logoUrl}
                            alt={partner.name}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {partner.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {partner.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{partner.email}</div>
                      <div className="text-sm text-gray-500">{partner.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {partner.partnerType || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(partner.status)}`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedPartner(partner)}
                          className="text-gray-600 hover:text-gray-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(partner)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {partner.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(partner.id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(partner.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(partner.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partner Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingPartner ? 'Edit Partner' : 'Add New Partner'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
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
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Partner Type
                    </label>
                    <select
                      value={formData.partnerType}
                      onChange={(e) => setFormData(prev => ({ ...prev, partnerType: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Type</option>
                      <option value="reseller">Reseller</option>
                      <option value="integrator">Integrator</option>
                      <option value="consultant">Consultant</option>
                      <option value="technology">Technology Partner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo Upload
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.logoUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.logoUrl}
                        alt="Logo preview"
                        className="h-16 w-16 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  {uploading && (
                    <p className="text-sm text-blue-600 mt-1">Uploading image...</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingPartner(null);
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
                    {loading ? 'Saving...' : (editingPartner ? 'Update' : 'Create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Partner Details Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Partner Details
                </h3>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {selectedPartner.logoUrl && (
                    <img
                      src={selectedPartner.logoUrl}
                      alt={selectedPartner.name}
                      className="h-16 w-16 rounded-lg"
                    />
                  )}
                  <div>
                    <h4 className="text-xl font-semibold">{selectedPartner.name}</h4>
                    <p className="text-gray-600">{selectedPartner.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedPartner.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{selectedPartner.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Website</label>
                    <p className="text-gray-900">
                      {selectedPartner.website ? (
                        <a href={selectedPartner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedPartner.website}
                        </a>
                      ) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Type</label>
                    <p className="text-gray-900">{selectedPartner.partnerType || 'General'}</p>
                  </div>
                </div>

                {selectedPartner.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Description</label>
                    <p className="text-gray-900 mt-1">{selectedPartner.description}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPartner.status)}`}>
                    {selectedPartner.status}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Joined</label>
                  <p className="text-gray-900">{new Date(selectedPartner.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;