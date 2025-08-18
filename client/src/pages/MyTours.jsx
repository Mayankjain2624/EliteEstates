import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaSpinner, FaPlus } from 'react-icons/fa';
import TourBookingCard from '../components/TourBookingCard';

export default function MyTours() {
  const [bookings, setBookings] = useState([]);
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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filter !== 'all') {
          params.append('status', filter);
        }
        params.append('limit', '10');

        const res = await fetch(`/api/tours/user/bookings?${params}`);
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
    };

    fetchBookings();
  }, [filter]);

  const handleBookingUpdate = (updatedBooking) => {
    setBookings(prev => 
      prev.map(booking => 
        booking._id === updatedBooking._id ? updatedBooking : booking
      )
    );
  };

  const getStatusCount = (status) => {
    if (status === 'all') return bookings.length;
    return bookings.filter(booking => booking.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <FaCalendarAlt className="text-emerald-300" />
                My Tours
              </h1>
              <p className="text-emerald-100 text-lg">Manage your property tour bookings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <FaSpinner className="text-4xl text-emerald-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading your tours...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Tours List */}
            {bookings.length > 0 ? (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <TourBookingCard
                    key={booking._id}
                    booking={booking}
                    onUpdate={handleBookingUpdate}
                    userRole="user"
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
                    {filter === 'all' ? 'No Tours Yet' : `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} Tours`}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {filter === 'all' 
                      ? "You haven't booked any property tours yet. Start exploring properties and book your first tour!"
                      : `You don't have any ${filter} tours at the moment.`
                    }
                  </p>
                  {filter === 'all' && (
                    <a
                      href="/search"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-blue-800 transition-all"
                    >
                      <FaPlus />
                      Browse Properties
                    </a>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
