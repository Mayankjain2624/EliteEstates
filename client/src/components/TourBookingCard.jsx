import { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaVideo, 
  FaMapMarkerAlt, 
  FaUsers,
  FaCheck,
  FaTimes,
  FaRedo,
  FaEye
} from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function TourBookingCard({ booking, onUpdate, userRole = 'user' }) {
  const [showDetails, setShowDetails] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [rescheduleOptions, setRescheduleOptions] = useState([
    { date: '', time: '' },
    { date: '', time: '' }
  ]);
  const [selectedReschedule, setSelectedReschedule] = useState(null);
  const [ownerMessage, setOwnerMessage] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  // Time slots for reschedule options
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rescheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'cancelled': return '❌';
      case 'completed': return '🎉';
      case 'rescheduled': return '🔄';
      default: return '📅';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleOwnerResponse = async (action) => {
    setActionLoading(action);
    try {
      const payload = {
        action,
        message: ownerMessage
      };

      if (action === 'reschedule') {
        const validOptions = rescheduleOptions.filter(opt => opt.date && opt.time);
        if (validOptions.length === 0) {
          alert('Please provide at least one reschedule option');
          return;
        }
        payload.rescheduleOptions = validOptions;
      }

      if (action === 'confirm' && booking.tourType === 'virtual') {
        payload.meetingLink = meetingLink;
      }

      const res = await fetch(`/api/tours/owner/respond/${booking._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        onUpdate(data.booking);
        alert(`Tour ${action}ed successfully!`);
      } else {
        alert(data.message || `Failed to ${action} tour`);
      }
    } catch (error) {
      console.error('Error responding to tour:', error);
      alert(`Failed to ${action} tour`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleUserRescheduleResponse = async (action) => {
    setActionLoading(action);
    try {
      const payload = { action };
      
      if (action === 'accept' && selectedReschedule) {
        payload.selectedDate = selectedReschedule.date;
        payload.selectedTime = selectedReschedule.time;
      }

      const res = await fetch(`/api/tours/reschedule-response/${booking._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        onUpdate(data.booking);
        alert(`Reschedule ${action}ed successfully!`);
      } else {
        alert(data.message || `Failed to ${action} reschedule`);
      }
    } catch (error) {
      console.error('Error responding to reschedule:', error);
      alert(`Failed to ${action} reschedule`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkComplete = async () => {
    const notes = prompt('Add completion notes (optional):');
    if (notes === null) return; // User cancelled

    setActionLoading('complete');
    try {
      const res = await fetch(`/api/tours/owner/complete/${booking._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes: notes || 'Tour completed successfully' }),
      });

      const data = await res.json();
      if (data.success) {
        onUpdate(data.booking);
        alert('Tour marked as completed successfully!');
      } else {
        alert(data.message || 'Failed to mark tour as complete');
      }
    } catch (error) {
      console.error('Error marking tour complete:', error);
      alert('Failed to mark tour as complete');
    } finally {
      setActionLoading(null);
    }
  };

  const addRescheduleOption = () => {
    if (rescheduleOptions.length < 5) {
      setRescheduleOptions([...rescheduleOptions, { date: '', time: '' }]);
    }
  };

  const updateRescheduleOption = (index, field, value) => {
    const updated = [...rescheduleOptions];
    updated[index][field] = value;
    setRescheduleOptions(updated);
  };

  const removeRescheduleOption = (index) => {
    if (rescheduleOptions.length > 1) {
      setRescheduleOptions(rescheduleOptions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {userRole === 'owner' ? booking.userId?.username : booking.listingId?.name}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                {getStatusIcon(booking.status)} {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                {booking.tourType === 'virtual' ? <FaVideo /> : <FaMapMarkerAlt />}
                <span>{booking.tourType === 'virtual' ? 'Virtual Tour' : 'Physical Tour'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendarAlt />
                <span>{formatDate(booking.requestedDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{formatTime(booking.requestedTime)}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaUsers />
                <span>{booking.userInfo?.groupSize || 1} people</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaEye />
          </button>
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="p-4 space-y-4">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Name:</strong> {booking.userInfo?.name}</p>
                <p><strong>Email:</strong> {booking.userInfo?.email}</p>
                <p><strong>Phone:</strong> {booking.userInfo?.phone}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tour Details</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Type:</strong> {booking.tourType}</p>
                <p><strong>Group Size:</strong> {booking.userInfo?.groupSize} people</p>
                <p><strong>Requested:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          {booking.userInfo?.message && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">User Message</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {booking.userInfo.message}
              </p>
            </div>
          )}

          {booking.specialRequests && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Special Requests</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {booking.specialRequests}
              </p>
            </div>
          )}

          {/* Owner Response */}
          {booking.ownerResponse?.message && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Owner Response</h4>
              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                {booking.ownerResponse.message}
              </p>
            </div>
          )}

          {/* Meeting Link */}
          {booking.meetingLink && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Meeting Link</h4>
              <a 
                href={booking.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {booking.meetingLink}
              </a>
            </div>
          )}

          {/* Completion Details */}
          {booking.status === 'completed' && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tour Completed</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FaCheck className="text-green-600" />
                  <span className="text-green-800 font-medium">Completed Successfully</span>
                </div>
                {booking.completedAt && (
                  <p className="text-sm text-green-700 mb-1">
                    Completed on: {new Date(booking.completedAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
                {booking.completionNotes && (
                  <p className="text-sm text-green-600">
                    Notes: {booking.completionNotes}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Reschedule Options for User */}
          {booking.status === 'rescheduled' && userRole === 'user' && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Available Reschedule Options</h4>
              <div className="space-y-2">
                {booking.ownerResponse?.rescheduleOptions?.map((option, index) => (
                  option.isAvailable && (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <input
                        type="radio"
                        name="rescheduleOption"
                        value={`${option.date}-${option.time}`}
                        onChange={() => setSelectedReschedule(option)}
                        className="text-emerald-600"
                      />
                      <div className="flex-1">
                        <span className="font-medium">
                          {formatDate(option.date)} at {formatTime(option.time)}
                        </span>
                      </div>
                    </div>
                  )
                ))}
              </div>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleUserRescheduleResponse('accept')}
                  disabled={!selectedReschedule || actionLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FaCheck />
                  {actionLoading === 'accept' ? 'Accepting...' : 'Accept Selected'}
                </button>
                <button
                  onClick={() => handleUserRescheduleResponse('decline')}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FaTimes />
                  {actionLoading === 'decline' ? 'Declining...' : 'Decline All'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Owner Actions */}
      {userRole === 'owner' && ['pending', 'rescheduled'].includes(booking.status) && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="space-y-4">
            {/* Response Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Message
              </label>
              <textarea
                value={ownerMessage}
                onChange={(e) => setOwnerMessage(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Add a message to the user..."
              />
            </div>

            {/* Virtual Tour Meeting Link */}
            {booking.tourType === 'virtual' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Link (for virtual tours)
                </label>
                <input
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="https://zoom.us/j/..."
                />
              </div>
            )}

            {/* Reschedule Options */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Reschedule Options
                </label>
                <button
                  onClick={addRescheduleOption}
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  + Add Option
                </button>
              </div>
              
              {rescheduleOptions.map((option, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="date"
                    value={option.date}
                    onChange={(e) => updateRescheduleOption(index, 'date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <select
                    value={option.time}
                    onChange={(e) => updateRescheduleOption(index, 'time', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {rescheduleOptions.length > 1 && (
                    <button
                      onClick={() => removeRescheduleOption(index)}
                      className="px-2 py-1 text-red-600 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleOwnerResponse('confirm')}
                disabled={actionLoading}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FaCheck />
                {actionLoading === 'confirm' ? 'Confirming...' : 'Confirm'}
              </button>
              
              <button
                onClick={() => handleOwnerResponse('reschedule')}
                disabled={actionLoading}
                className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FaRedo />
                {actionLoading === 'reschedule' ? 'Sending...' : 'Reschedule'}
              </button>
              
              <button
                onClick={() => handleOwnerResponse('cancel')}
                disabled={actionLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FaTimes />
                {actionLoading === 'cancel' ? 'Cancelling...' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark as Complete Action for Confirmed Tours */}
      {userRole === 'owner' && booking.status === 'confirmed' && (
        <div className="p-4 bg-green-50 border-t border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-green-800">Tour Confirmed</h4>
              <p className="text-xs text-green-600">Mark as complete when the tour is finished</p>
            </div>
            <button
              onClick={handleMarkComplete}
              disabled={actionLoading === 'complete'}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FaCheck />
              {actionLoading === 'complete' ? 'Completing...' : 'Mark Complete'}
            </button>
          </div>
        </div>
      )}
              
      {/* User Reschedule Actions */}
      {userRole === 'user' && booking.status === 'rescheduled' && (
        <div className="p-4 bg-amber-50 border-t border-amber-200">
          <div className="space-y-3">
            <h4 className="font-medium text-amber-800">Reschedule Options Available</h4>
            {selectedReschedule && (
              <div className="p-3 bg-white border border-amber-200 rounded-lg">
                <p className="text-sm text-gray-600">
                  Selected: {new Date(selectedReschedule.date).toLocaleDateString()} at {selectedReschedule.time}
                </p>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => handleUserRescheduleResponse('accept')}
                disabled={actionLoading || !selectedReschedule}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading === 'accept' ? 'Accepting...' : 'Accept Reschedule'}
              </button>
              
              <button
                onClick={() => handleUserRescheduleResponse('decline')}
                disabled={actionLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading === 'decline' ? 'Declining...' : 'Decline'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

TourBookingCard.propTypes = {
  booking: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  userRole: PropTypes.oneOf(['user', 'owner']),
};
