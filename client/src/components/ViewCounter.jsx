import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function ViewCounter({ listingId, size = 'normal', className = '' }) {
  const [viewCount, setViewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Size configurations
  const sizeConfig = {
    small: {
      container: 'text-xs',
      icon: 'text-xs',
      text: 'text-xs'
    },
    normal: {
      container: 'text-sm',
      icon: 'text-sm',
      text: 'text-sm'
    },
    large: {
      container: 'text-base',
      icon: 'text-base',
      text: 'text-base'
    }
  };

  const config = sizeConfig[size] || sizeConfig.normal;

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/analytics/public/${listingId}`);
        const data = await res.json();
        
        if (data.success && data.analytics) {
          setViewCount(data.analytics.views || 0);
        }
      } catch (error) {
        console.log('Error fetching view count:', error);
      } finally {
        setLoading(false);
      }
    };

    if (listingId) {
      fetchViewCount();
    }
  }, [listingId]);

  if (loading) {
    return (
      <div className={`flex items-center gap-1 text-gray-400 ${config.container} ${className}`}>
        <FaEye className={config.icon} />
        <span className={`${config.text} animate-pulse`}>...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 text-gray-600 ${config.container} ${className}`}>
      <FaEye className={`${config.icon} text-emerald-600`} />
      <span className={`${config.text} font-medium`}>
        {viewCount.toLocaleString()} {viewCount === 1 ? 'view' : 'views'}
      </span>
    </div>
  );
}

ViewCounter.propTypes = {
  listingId: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  className: PropTypes.string,
};
