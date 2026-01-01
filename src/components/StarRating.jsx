import { Star } from 'lucide-react';
import PropTypes from 'prop-types';

export default function StarRating({
  value = 0,
  onChange,
  readonly = false,
  size = 20,
  showValue = false,
}) {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleKeyDown = (e, rating) => {
    if (!readonly && onChange && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onChange(rating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex" role={readonly ? 'img' : 'group'} aria-label={`Rating: ${value} out of 5 stars`}>
        {stars.map((star) => {
          const isFilled = star <= value;
          const isHalf = !isFilled && star - 0.5 <= value;

          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onKeyDown={(e) => handleKeyDown(e, star)}
              disabled={readonly}
              className={`
                ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                transition-transform focus:outline-none focus:ring-2 focus:ring-holiday-gold focus:ring-offset-1 rounded
                ${!readonly && 'hover:text-holiday-gold'}
              `}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
              tabIndex={readonly ? -1 : 0}
            >
              <Star
                size={size}
                className={`
                  ${isFilled ? 'fill-holiday-gold text-holiday-gold' : ''}
                  ${isHalf ? 'fill-holiday-gold/50 text-holiday-gold' : ''}
                  ${!isFilled && !isHalf ? 'text-gray-300' : ''}
                  transition-colors
                `}
              />
            </button>
          );
        })}
      </div>
      {showValue && value > 0 && (
        <span className="text-sm text-mtm-text-secondary ml-1">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}

StarRating.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  size: PropTypes.number,
  showValue: PropTypes.bool,
};
