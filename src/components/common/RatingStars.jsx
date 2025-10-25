import { Star } from 'lucide-react';

const RatingStars = ({
  rating = 0,
  maxRating = 5,
  size = 16,
  showNumber = false,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[...Array(maxRating)].map((_, index) => {
          const isFilled = index < Math.floor(rating);
          const isPartial = index === Math.floor(rating) && rating % 1 !== 0;
          const partialPercent = isPartial ? (rating % 1) * 100 : 0;

          return (
            <div key={index} className="relative">
              {isPartial ? (
                <>
                  <Star
                    size={size}
                    className="text-gray-300"
                    fill="currentColor"
                  />
                  <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: `${partialPercent}%` }}
                  >
                    <Star
                      size={size}
                      className="text-gold-500"
                      fill="currentColor"
                    />
                  </div>
                </>
              ) : (
                <Star
                  size={size}
                  className={isFilled ? 'text-gold-500' : 'text-gray-300'}
                  fill="currentColor"
                />
              )}
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
