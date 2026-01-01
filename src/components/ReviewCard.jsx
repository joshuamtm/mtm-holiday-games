import PropTypes from 'prop-types';
import StarRating from './StarRating';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function maskEmail(email) {
  if (!email || !email.includes('@')) return 'Anonymous';
  const [name, domain] = email.split('@');
  const maskedName = name.length > 2
    ? name.slice(0, 2) + '***'
    : name + '***';
  return `${maskedName}@${domain}`;
}

export default function ReviewCard({ review, isCurrentUser = false }) {
  return (
    <div className={`
      p-4 rounded-lg border
      ${isCurrentUser
        ? 'bg-holiday-gold/10 border-holiday-gold/30'
        : 'bg-white border-holiday-green/20'
      }
    `}>
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <StarRating value={review.rating} readonly size={16} />
          <span className="text-sm font-medium text-holiday-pine">
            {maskEmail(review.user_email)}
            {isCurrentUser && (
              <span className="ml-2 text-xs text-holiday-gold font-normal">(You)</span>
            )}
          </span>
        </div>
        <span className="text-xs text-mtm-text-secondary whitespace-nowrap">
          {formatDate(review.created_at)}
        </span>
      </div>

      {review.comment && (
        <p className="text-sm text-mtm-text mt-2 leading-relaxed">
          "{review.comment}"
        </p>
      )}
    </div>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string,
    user_email: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  isCurrentUser: PropTypes.bool,
};
