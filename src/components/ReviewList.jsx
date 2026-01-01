import PropTypes from 'prop-types';
import { MessageSquare } from 'lucide-react';
import StarRating from './StarRating';
import ReviewCard from './ReviewCard';

export default function ReviewList({ reviews, stats, loading, currentUserEmail }) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const hasReviews = reviews && reviews.length > 0;

  return (
    <div className="mt-8">
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-holiday-pine flex items-center gap-2">
          <MessageSquare size={18} className="text-holiday-green" />
          Reviews {hasReviews && `(${stats.reviewCount})`}
        </h4>

        {hasReviews && (
          <div className="flex items-center gap-2">
            <StarRating value={stats.averageRating} readonly size={16} />
            <span className="text-sm text-mtm-text-secondary">
              {stats.averageRating.toFixed(1)} average
            </span>
          </div>
        )}
      </div>

      {/* Review list */}
      {hasReviews ? (
        <div className="space-y-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isCurrentUser={review.user_email === currentUserEmail}
            />
          ))}
        </div>
      ) : (
        <div className="bg-holiday-snow/50 border border-holiday-green/20 rounded-xl p-8 text-center">
          <MessageSquare size={32} className="mx-auto text-holiday-green/40 mb-3" />
          <p className="text-mtm-text-secondary text-sm">
            No reviews yet. Be the first to share your experience!
          </p>
        </div>
      )}
    </div>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string,
      user_email: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ),
  stats: PropTypes.shape({
    averageRating: PropTypes.number,
    reviewCount: PropTypes.number,
  }),
  loading: PropTypes.bool,
  currentUserEmail: PropTypes.string,
};

ReviewList.defaultProps = {
  reviews: [],
  stats: { averageRating: 0, reviewCount: 0 },
  loading: false,
  currentUserEmail: null,
};
