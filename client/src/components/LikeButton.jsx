import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function LikeButton({ listingId, className = '', size = 'normal' }) {
  const { currentUser } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [loading, setLoading] = useState(false);

  // Size configurations
  const sizeConfig = {
    normal: {
      container: 'w-8 h-8',
      icon: 'text-lg',
      button: 'p-2'
    },
    large: {
      container: 'w-12 h-12',
      icon: 'text-xl',
      button: 'p-3'
    }
  };

  const config = sizeConfig[size] || sizeConfig.normal;

  const fetchLikeStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/analytics/like-status/${listingId}`);
      const data = await res.json();
      if (data.success) {
        setLiked(data.liked);
        setTotalLikes(data.totalLikes);
      }
    } catch (error) {
      console.log('Error fetching like status:', error);
    }
  }, [listingId]);

  useEffect(() => {
    fetchLikeStatus();
  }, [fetchLikeStatus]);

  const handleToggleLike = async () => {
    if (!currentUser) {
      // Redirect to sign in or show modal
      window.location.href = '/signin';
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/like/${listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success) {
        setLiked(data.liked);
        setTotalLikes(data.totalLikes);
      }
    } catch (error) {
      console.log('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={loading}
      className={`flex items-center gap-2 ${config.button} rounded-lg border transition-all duration-200 ${
        liked
          ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
      } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'} ${className}`}
    >
      {liked ? (
        <FaHeart className={`text-red-500 ${config.icon}`} />
      ) : (
        <FaRegHeart className={config.icon} />
      )}
      {size === 'normal' && (
        <span className="text-sm font-medium">
          {totalLikes} {totalLikes === 1 ? 'Like' : 'Likes'}
        </span>
      )}
    </button>
  );
}

LikeButton.propTypes = {
  listingId: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['normal', 'large']),
};
