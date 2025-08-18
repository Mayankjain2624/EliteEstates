import { useState, useEffect, useCallback } from 'react';
import { 
  FaCalendarAlt, 
  FaSpinner, 
  FaVideo, 
  FaMapMarkerAlt,
  FaClock,
  FaChartBar
} from 'react-icons/fa';
import TourBookingCard from '../components/TourBookingCard';

export default function ToursDashboard() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [pagination, setPagination] = useState({});

  const statusFilters = [
    { value: 'all', label: 'All Tours', color: 'bg-gray-100 text-gray-800' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-800' },
    { value: 'rescheduled', label: 'Rescheduled', color: 'bg-purple-100 text-purple-800' },
    { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  ];

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await fetch('/api/tours/owner/dashboard-stats');
      const data = await res.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  }, []);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.append('status', filter);
      }
      params.append('limit', '10');

      const res = await fetch(`/api/tours/owner/bookings?${params}`);
      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings);
        setPagination(data.pagination);
      } else {
        console.error('Failed to fetch bookings:', data.message);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchDashboardData();
    fetchBookings();
  }, [fetchDashboardData, fetchBookings]);

  const handleBookingUpdate = (updatedBooking) => {
    setBookings(prev => 
      prev.map(booking => 
        booking._id === updatedBooking._id ? updatedBooking : booking
      )
    );
    
    // Refresh stats after an update
    fetchDashboardData();
  };

  const getStatusCount = (status) => {
    if (status === 'all') return stats.totalBookings || 0;
    return stats[`${status}Bookings`] || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaCalendarAlt className="text-emerald-300" />
            Tours Dashboard
          </h1>
          <p className="text-emerald-100 text-lg">Manage property tour requests and bookings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Tours</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBookings || 0}</p>
                <p className="text-xs text-gray-400 mt-1">All time</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaCalendarAlt className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingBookings || 0}</p>
                <p className="text-xs text-yellow-600 mt-1">Need attention</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FaClock className="text-2xl text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Virtual Tours</p>
                <p className="text-3xl font-bold text-gray-900">{stats.virtualTours || 0}</p>
                <p className="text-xs text-purple-600 mt-1">Online meetings</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaVideo className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Physical Tours</p>
                <p className="text-3xl font-bold text-gray-900">{stats.physicalTours || 0}</p>
                <p className="text-xs text-emerald-600 mt-1">In-person visits</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <FaMapMarkerAlt className="text-2xl text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartBar className="text-emerald-600" />
            Quick Overview
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.confirmedBookings || 0}</div>
              <div className="text-xs text-gray-600">Confirmed</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.completedBookings || 0}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.cancelledBookings || 0}</div>
              <div className="text-xs text-gray-600">Cancelled</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {stats.totalBookings > 0 ? Math.round((stats.confirmedBookings / stats.totalBookings) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-600">Confirmation Rate</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {stats.totalBookings > 0 ? Math.round((stats.completedBookings / stats.totalBookings) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-600">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((statusFilter) => (
              <button
                key={statusFilter.value}
                onClick={() => setFilter(statusFilter.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === statusFilter.value
                    ? 'bg-emerald-600 text-white shadow-lg scale-105'
                    : `${statusFilter.color} hover:shadow-md hover:scale-102`
                }`}
              >
                {statusFilter.label}
                {getStatusCount(statusFilter.value) > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white bg-opacity-20">
                    {getStatusCount(statusFilter.value)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tours List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <FaSpinner className="text-4xl text-emerald-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading tour bookings...</p>
            </div>
          </div>
        ) : (
          <>
            {bookings.length > 0 ? (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <TourBookingCard
                    key={booking._id}
                    booking={booking}
                    onUpdate={handleBookingUpdate}
                    userRole="owner"
                  />
                ))}
                
                {/* Pagination */}
                {pagination.total > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      disabled={pagination.current === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    
                    <span className="px-4 py-2 text-gray-600">
                      Page {pagination.current} of {pagination.total}
                    </span>
                    
                    <button
                      disabled={pagination.current === pagination.total}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                  <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {filter === 'all' ? 'No Tour Requests' : `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} Tours`}
                  </h3>
                  <p className="text-gray-600">
                    {filter === 'all' 
                      ? "You haven't received any tour requests yet. Make sure your properties are listed and attractive to potential buyers!"
                      : `You don't have any ${filter} tours at the moment.`
                    }
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
