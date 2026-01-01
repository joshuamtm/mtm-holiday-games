import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import StarRating from './StarRating';
import { useAuth } from '../context/AuthContext';

const MAX_COMMENT_LENGTH = 280;

export default function ReviewForm({ gameSlug, onSubmit, existingReview, isConfigured = true }) {
  const { isUnlocked, email } = useAuth();
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Reset form when existing review changes
  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment || '');
    }
  }, [existingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!rating) {
      setError('Please select a star rating');
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        rating,
        comment: comment.trim(),
        userEmail: email,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Supabase not configured - show coming soon message
  if (!isConfigured) {
    return (
      <div className="bg-holiday-snow/50 border border-holiday-green/20 rounded-xl p-6 text-center">
        <h4 className="font-semibold text-holiday-pine mb-2">Reviews Coming Soon!</h4>
        <p className="text-mtm-text-secondary text-sm">
          We're setting up the review system. Check back shortly!
        </p>
      </div>
    );
  }

  // Not unlocked - show prompt to unlock
  if (!isUnlocked) {
    return (
      <div className="bg-holiday-snow/50 border border-holiday-green/20 rounded-xl p-6 text-center">
        <p className="text-mtm-text-secondary text-sm">
          Unlock all games to leave a review
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-holiday-green/20 rounded-xl p-6">
      <h4 className="font-semibold text-holiday-pine mb-4">
        {existingReview ? 'Update Your Review' : 'Rate This Game'}
      </h4>

      {/* Star Rating */}
      <div className="mb-4">
        <label className="block text-sm text-mtm-text-secondary mb-2">
          Your Rating <span className="text-holiday-red">*</span>
        </label>
        <StarRating
          value={rating}
          onChange={setRating}
          size={28}
        />
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label className="block text-sm text-mtm-text-secondary mb-2">
          Share your experience (optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
          placeholder="What did you think? Any tips for other players?"
          className="w-full px-4 py-3 border border-holiday-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-holiday-gold focus:border-transparent resize-none text-sm"
          rows={3}
          disabled={submitting}
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${comment.length >= MAX_COMMENT_LENGTH ? 'text-holiday-red' : 'text-mtm-text-secondary'}`}>
            {comment.length}/{MAX_COMMENT_LENGTH}
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-holiday-red text-sm mb-4 p-3 bg-holiday-red/10 rounded-lg">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-2 text-holiday-green text-sm mb-4 p-3 bg-holiday-green/10 rounded-lg">
          <CheckCircle size={16} />
          <span>{existingReview ? 'Review updated!' : 'Thanks for your review!'}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting || !rating}
        className={`
          w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
          ${submitting || !rating
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'btn-holiday-gold'
          }
        `}
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            {existingReview ? 'Update Review' : 'Submit Review'}
          </>
        )}
      </button>

      {/* Reviewer attribution */}
      <p className="text-xs text-mtm-text-secondary mt-3 text-center">
        Reviewing as {email?.includes('@') ? email.split('@')[0] + '@...' : email}
      </p>
    </form>
  );
}

ReviewForm.propTypes = {
  gameSlug: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  existingReview: PropTypes.shape({
    rating: PropTypes.number,
    comment: PropTypes.string,
  }),
  isConfigured: PropTypes.bool,
};
