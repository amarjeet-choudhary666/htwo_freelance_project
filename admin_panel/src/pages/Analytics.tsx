import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, FileText, Calendar, Download } from 'lucide-react';
import { analyticsAPI } from '../api/admin';
import type { AnalyticsData } from '../types/admin';

const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalSubmissions: 0,
    submissionsByType: [],
    submissionsByMonth: [],
    topServices: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await analyticsAPI.getAnalytics();
      if (data.success) {
        setAnalytics(data.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      // Create a simple CSV export of the analytics data
      const csvData = [
        ['Metric', 'Value'],
        ['Total Submissions', analytics.totalSubmissions.toString()],
        [''],
        ['Submissions by Type'],
        ...analytics.submissionsByType.map(item => [item.type, item._count.toString()]),
        [''],
        ['Top Services'],
        ...analytics.topServices.map(item => [item.service || 'N/A', item._count.toString()]),
      ];

      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analytics.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting analytics:', error);
      alert('Error exporting analytics');
    }
  };

  if (loading) {
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-gray-600">Detailed insights into your platform's performance</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Submissions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalSubmissions}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Submission Types</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.submissionsByType.length}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Services</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.topServices.length}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Data Points</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics.submissionsByMonth.length + analytics.submissionsByType.length + analytics.topServices.length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-orange-50">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions by Type */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Submissions by Type</h2>
          </div>
          <div className="p-6">
            {analytics.submissionsByType.length > 0 ? (
              <div className="space-y-4">
                {analytics.submissionsByType.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {item.type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{item._count}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${(item._count / Math.max(...analytics.submissionsByType.map(i => i._count))) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No data available</p>
            )}
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Top Services</h2>
          </div>
          <div className="p-6">
            {analytics.topServices.length > 0 ? (
              <div className="space-y-4">
                {analytics.topServices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.service || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{item._count} submissions</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{
                            width: `${(item._count / Math.max(...analytics.topServices.map(i => i._count))) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Monthly Trends</h2>
        </div>
        <div className="p-6">
          {analytics.submissionsByMonth.length > 0 ? (
            <div className="space-y-4">
              {analytics.submissionsByMonth.slice(0, 12).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{item._count} submissions</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(item._count / Math.max(...analytics.submissionsByMonth.map(i => i._count))) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No monthly data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;