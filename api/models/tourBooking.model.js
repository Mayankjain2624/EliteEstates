import mongoose from 'mongoose';

const tourBookingSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tourType: {
    type: String,
    enum: ['physical', 'virtual'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'rescheduled'],
    default: 'pending'
  },
  requestedDate: {
    type: Date,
    required: true
  },
  requestedTime: {
    type: String,
    required: true
  },
  confirmedDate: {
    type: Date
  },
  confirmedTime: {
    type: String
  },
  userInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    message: {
      type: String
    },
    groupSize: {
      type: Number,
      default: 1,
      min: 1,
      max: 10
    }
  },
  ownerResponse: {
    message: String,
    respondedAt: Date,
    rescheduleOptions: [{
      date: Date,
      time: String,
      isAvailable: {
        type: Boolean,
        default: true
      }
    }]
  },
  reschedulingHistory: [{
    requestedBy: {
      type: String,
      enum: ['user', 'owner']
    },
    previousDate: Date,
    previousTime: String,
    newDate: Date,
    newTime: String,
    reason: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  meetingLink: {
    type: String // For virtual tours
  },
  specialRequests: {
    type: String
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  cancelReason: {
    type: String
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    submittedAt: Date
  },
  completedAt: {
    type: Date
  },
  completionNotes: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
tourBookingSchema.index({ listingId: 1, userId: 1 });
tourBookingSchema.index({ ownerId: 1, status: 1 });
tourBookingSchema.index({ requestedDate: 1, status: 1 });

// Virtual for formatted date display
tourBookingSchema.virtual('formattedRequestedDate').get(function() {
  return this.requestedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for time slot display
tourBookingSchema.virtual('timeSlot').get(function() {
  const date = this.confirmedDate || this.requestedDate;
  const time = this.confirmedTime || this.requestedTime;
  return `${date.toLocaleDateString()} at ${time}`;
});

// Method to check if tour is in the past
tourBookingSchema.methods.isPastTour = function() {
  const tourDateTime = new Date(this.requestedDate);
  const [hours, minutes] = this.requestedTime.split(':');
  tourDateTime.setHours(parseInt(hours), parseInt(minutes));
  return tourDateTime < new Date();
};

// Method to get available reschedule slots
tourBookingSchema.methods.getAvailableRescheduleSlots = function() {
  return this.ownerResponse.rescheduleOptions.filter(option => option.isAvailable);
};

const TourBooking = mongoose.model('TourBooking', tourBookingSchema);

export default TourBooking;
