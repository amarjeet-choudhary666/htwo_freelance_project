import { useState, useEffect } from 'react';
import { Search, Eye, Trash2, Download } from 'lucide-react';
import { submissionAPI } from '../api/admin';
import type { Submission } from '../types/admin';

const Submissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSubmissions();
  }, [searchTerm, statusFilter, typeFilter, currentPage]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await submissionAPI.getAll({
        page: currentPage,
        limit: 20,
        search: searchTerm,
        status: statusFilter,
        type: typeFilter,
      });

      if (response.success) {
        setSubmissions(response.data || []);
        setTotalPages(response.pagination?.total || 1);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await submissionAPI.updateStatus(id, status);
      fetchSubmissions();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      await submissionAPI.delete(id);
      fetchSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Error deleting submission');
    }
  };

  const handleBulkDelete = async () => {
    const selectedIds = submissions.filter(s => (s as any).selected).map(s => s.id);
    if (selectedIds.length === 0) return;

    if (!confirm(`Are you sure you want to delete ${selectedIds.length} submissions?`)) return;

    try {
      await submissionAPI.bulkDelete(selectedIds);
      fetchSubmissions();
    } catch (error) {
      console.error('Error bulk deleting:', error);
      alert('Error deleting submissions');
    }
  };

  const handleBulkStatusUpdate = async (status: string) => {
    const selectedIds = submissions.filter(s => (s as any).selected).map(s => s.id);
    if (selectedIds.length === 0) return;

    try {
      await submissionAPI.bulkUpdateStatus(selectedIds, status);
      fetchSubmissions();
    } catch (error) {
      console.error('Error bulk updating status:', error);
      alert('Error updating status');
    }
  };

  const handleExport = async () => {
    try {
      const response = await submissionAPI.export();
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'submissions.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Error exporting submissions');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'demo':
        return 'bg-purple-100 text-purple-800';
      case 'contact':
        return 'bg-blue-100 text-blue-800';
      case 'get_in_touch':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedCount = submissions.filter(s => (s as any).selected).length;

  if (loading && submissions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Submissions Management</h1>
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search submissions..."
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
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="demo">Demo Request</option>
            <option value="contact">Contact Form</option>
            <option value="get_in_touch">Get In Touch</option>
          </select>
          {selectedCount > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkStatusUpdate('completed')}
                className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
              >
                Mark Complete
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-sm"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSubmissions(submissions.map(s => ({ ...s, selected: checked })));
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={(submission as any).selected || false}
                      onChange={(e) => {
                        const updated = submissions.map(s =>
                          s.id === submission.id ? { ...s, selected: e.target.checked } : s
                        );
                        setSubmissions(updated);
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                      <div className="text-sm text-gray-500">{submission.email}</div>
                      {submission.phone && (
                        <div className="text-sm text-gray-500">{submission.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(submission.type)}`}>
                      {submission.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {submission.service || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={submission.status}
                      onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${getStatusColor(submission.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="text-gray-600 hover:text-gray-900"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(submission.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submission Details Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Submission Details</h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{selectedSubmission.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Type</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedSubmission.type)}`}>
                      {selectedSubmission.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Service</label>
                    <p className="text-gray-900">{selectedSubmission.service || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSubmission.status)}`}>
                      {selectedSubmission.status}
                    </span>
                  </div>
                </div>

                {selectedSubmission.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Message</label>
                    <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                )}

                {selectedSubmission.user && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">User</label>
                    <p className="text-gray-900">
                      {selectedSubmission.user.firstname || selectedSubmission.user.email}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-500">Submitted</label>
                  <p className="text-gray-900">{new Date(selectedSubmission.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissions;