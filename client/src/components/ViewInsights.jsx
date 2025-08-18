import { useState, useEffect } from 'react';
import { FaEye, FaClock, FaTrendingUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function ViewInsights({ listingId }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViewInsights = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/analytics/public/${listingId}`);
        const data = await res.json();
        
        if (data.success && data.analytics) {
          // Calculate insights from view history
          const viewHistory = data.analytics.viewHistory || [];
          const now = new Date();
          
          // Views in last 24 hours
          const last24Hours = viewHistory.filter(view => {
            const viewDate = new Date(view.viewedAt);
            return (now - viewDate) <= 24 * 60 * 60 * 1000;
          }).length;

          // Views in last 7 days
          const last7Days = viewHistory.filter(view => {
            const viewDate = new Date(view.viewedAt);
            return (now - viewDate) <= 7 * 24 * 60 * 60 * 1000;
          }).length;

          // Unique viewers
          const uniqueViewers = new Set(viewHistory.map(view => 
            view.userId || view.ipAddress
          )).size;

          // Average views per day (last 30 days)
          const avgViewsPerDay = viewHistory.length > 0 ? 
            (viewHistory.length / Math.min(30, Math.ceil((now - new Date(viewHistory[0].viewedAt)) / (24 * 60 * 60 * 1000))) || 1).toFixed(1) : 0;

          setInsights({
            totalViews: data.analytics.views,
            last24Hours,
            last7Days,
            uniqueViewers,
            avgViewsPerDay,
            viewHistory: viewHistory.slice(-10) // Last 10 views
          });
        }
      } catch (error) {
        console.log('Error fetching view insights:', error);
      } finally {
        setLoading(false);
      }
    };

    if (listingId) {
      fetchViewInsights();
    }
  }, [listingId]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="text-center text-gray-500">
          <FaEye className="mx-auto text-2xl mb-2" />
          <p>No view data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FaEye className="text-emerald-600" />
        View Insights
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-emerald-600">{insights.totalViews}</div>
          <div className="text-xs text-gray-600">Total Views</div>
        </div>
        
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{insights.last24Hours}</div>
          <div className="text-xs text-gray-600">Last 24h</div>
        </div>
        
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{insights.last7Days}</div>
          <div className="text-xs text-gray-600">Last 7 days</div>
        </div>
        
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{insights.uniqueViewers}</div>
          <div className="text-xs text-gray-600">Unique Viewers</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <FaTrendingUp className="text-emerald-500" />
          <span>Avg: {insights.avgViewsPerDay} views/day</span>
        </div>
        
        {insights.viewHistory.length > 0 && (
          <div className="flex items-center gap-1">
            <FaClock className="text-blue-500" />
            <span>Last viewed {new Date(insights.viewHistory[insights.viewHistory.length - 1].viewedAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

ViewInsights.propTypes = {
  listingId: PropTypes.string.isRequired,
};
