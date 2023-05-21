import { useState } from "react";

export const StarRating = ({
  onRatingChanged,
}: {
  onRatingChanged: (rating: number) => void;
}) => {
  const [rating, _setRating] = useState(0);

  const setRating = (newRating: number) => {
    _setRating(newRating);
    onRatingChanged(newRating);
  };

  return (
    <>
      <button onClick={() => setRating(1)}>
        {rating >= 1 ? <>&#9733;</> : <>&#9734;</>}
      </button>
      <button onClick={() => setRating(2)}>
        {rating >= 2 ? <>&#9733;</> : <>&#9734;</>}
      </button>
      <button onClick={() => setRating(3)}>
        {rating >= 3 ? <>&#9733;</> : <>&#9734;</>}
      </button>
      <button onClick={() => setRating(4)}>
        {rating >= 4 ? <>&#9733;</> : <>&#9734;</>}
      </button>
      <button onClick={() => setRating(5)}>
        {rating >= 5 ? <>&#9733;</> : <>&#9734;</>}
      </button>
    </>
  );
};
