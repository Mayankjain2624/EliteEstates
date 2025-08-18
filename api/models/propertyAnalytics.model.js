import mongoose from 'mongoose';

const propertyAnalyticsSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likedAt: {
      type: Date,
      default: Date.now,
    }
  }],
  totalLikes: {
    type: Number,
    default: 0,
  },
  viewHistory: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    ipAddress: String,
    userAgent: String,
    viewedAt: {
      type: Date,
      default: Date.now,
    }
  }],
  inquiries: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    inquiryType: {
      type: String,
      enum: ['tour_request', 'contact', 'phone_call', 'email'],
      required: true,
    },
    inquiredAt: {
      type: Date,
      default: Date.now,
    }
  }],
}, {
  timestamps: true,
});

// Index for better query performance
propertyAnalyticsSchema.index({ listingId: 1 });
propertyAnalyticsSchema.index({ 'likes.userId': 1 });

const PropertyAnalytics = mongoose.model('PropertyAnalytics', propertyAnalyticsSchema);

export default PropertyAnalytics;
