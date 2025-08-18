import { useState, useEffect } from 'react';
import { 
  FaEye, 
  FaHeart, 
  FaEnvelope, 
  FaChartLine, 
  FaHome,
  FaArrowUp,
  FaCalendarAlt 
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/analytics/dashboard');
      const data = await res.json();
      
      if (data.success) {
        setDashboardData(data.dashboard);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch dashboard data');
      console.log('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: dashboardData?.dailyViews?.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }) || [],
    datasets: [
      {
        label: 'Daily Views',
        data: dashboardData?.dailyViews?.map(item => item.views) || [],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Property Views Over Time (Last 30 Days)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaChartLine className="text-emerald-300" />
            Analytics Dashboard
          </h1>
          <p className="text-emerald-100 text-lg">Track your property performance and engagement</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData?.overview?.totalProperties || 0}</p>
                <p className="text-xs text-gray-400 mt-1">Active listings</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaHome className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData?.overview?.totalViews || 0}</p>
                <p className="text-xs text-emerald-600 mt-1">
                  +{dashboardData?.overview?.recentViews || 0} this month
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <FaEye className="text-2xl text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Likes</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData?.overview?.totalLikes || 0}</p>
                <p className="text-xs text-red-600 mt-1">
                  +{dashboardData?.overview?.recentLikes || 0} this month
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FaHeart className="text-2xl text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Inquiries</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData?.overview?.totalInquiries || 0}</p>
                <p className="text-xs text-purple-600 mt-1">Potential leads</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaEnvelope className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Views Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaArrowUp className="text-emerald-600" />
              Views Analytics
            </h2>
            <p className="text-gray-600">Track your property views over the last 30 days</p>
          </div>
          <div className="h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Top Performing Properties */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaChartLine className="text-emerald-600" />
              Top Performing Properties
            </h2>
            <p className="text-gray-600">Your most viewed and liked properties</p>
          </div>
          
          <div className="space-y-4">
            {dashboardData?.topProperties?.map((property, index) => (
              <div key={property.listing._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full font-semibold">
                    {index + 1}
                  </div>
                  <img
                    src={property.listing.imageUrls?.[0] || '/default-house.svg'}
                    alt={property.listing.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{property.listing.name}</h3>
                    <p className="text-sm text-gray-600">{property.listing.address}</p>
                    <p className="text-sm font-medium text-emerald-600">
                      ${property.listing.regularPrice?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{property.views}</p>
                    <p className="text-gray-500">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{property.likes}</p>
                    <p className="text-gray-500">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{property.inquiries}</p>
                    <p className="text-gray-500">Inquiries</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Properties Analytics */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaCalendarAlt className="text-emerald-600" />
              All Properties Performance
            </h2>
            <p className="text-gray-600">Detailed analytics for all your listings</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Likes</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Inquiries</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Last Viewed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboardData?.analyticsData?.map((property) => (
                  <tr key={property.listingId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={property.listingImage || '/default-house.svg'}
                          alt={property.listingName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{property.listingName}</p>
                          <p className="text-sm text-gray-500">ID: {property.listingId.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <FaEye className="text-emerald-600" />
                        <span className="font-medium">{property.views}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-red-500" />
                        <span className="font-medium">{property.likes}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <FaEnvelope className="text-purple-600" />
                        <span className="font-medium">{property.inquiries}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {property.lastViewed 
                        ? new Date(property.lastViewed).toLocaleDateString()
                        : 'Never'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
