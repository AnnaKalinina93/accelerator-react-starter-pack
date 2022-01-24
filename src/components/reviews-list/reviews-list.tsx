import { useState } from 'react';
import { Comment } from '../../types/guitar';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  comments: Comment[],
}

function ReviewsList ({comments}:ReviewsListProps): JSX.Element {

  const [countRaviews, setCountReviews] = useState(3);

  const handleClickButton = () => {
    setCountReviews(countRaviews+3);
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="#"
      >
        Оставить отзыв
      </a>
      {comments.length >=1 && comments.slice(0, countRaviews).map(
        (comment) =>
          comment && (
            <ReviewItem key={comment.id} comment={comment}/>
          ),
      )}
      {comments.length > 3 && countRaviews <= comments.length && (
        <button className="button button--medium reviews__more-button"
          onClick={handleClickButton}
        >
          Показать еще отзывы
        </button>
      )}

      { comments.length &&(
        <a
          className="button button--up button--red-border button--big reviews__up-button"
          href="#header"
        >
        Наверх
        </a>)}
    </section>
  );
}

export default ReviewsList;
