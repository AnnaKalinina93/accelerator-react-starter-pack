/* eslint-disable jsx-a11y/anchor-is-valid */
import dayjs from 'dayjs';
import { useState } from 'react';
import { Comment } from '../../types/guitar';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  comments: Comment[],
  onClickFormReview: (param: boolean) => void,
}

function ReviewsList({ comments, onClickFormReview }: ReviewsListProps): JSX.Element {

  const [countRaviews, setCountReviews] = useState(3);

  const handleClickButton = () => {
    setCountReviews(countRaviews + 3);
  };

  const sortComments = comments.slice().sort((a, b) => {
    const isBefore = dayjs(a.createAt).isBefore(b.createAt);
    if (isBefore) { return 1; }
    return -1;
  });

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        onClick={() => onClickFormReview(true)}
        data-testid="Оставить отзыв"
      >
        Оставить отзыв
      </a>
      {sortComments.length >= 1 && sortComments.slice(0, countRaviews).map(
        (comment) =>
          comment && (
            <ReviewItem key={comment.id} comment={comment} />
          ),
      )}
      {sortComments.length > 3 && countRaviews <= sortComments.length && (
        <button className="button button--medium reviews__more-button"
          onClick={handleClickButton}
        >
          Показать еще отзывы
        </button>
      )}

      {sortComments.length>=1 && (
        <a
          className="button button--up button--red-border button--big reviews__up-button"
          style={{ zIndex: '10' }}
          onClick={(evt) => {
            evt.preventDefault();
            window.scroll(0, 0);
          }}
        >
          Наверх
        </a>)}
    </section>
  );
}

export default ReviewsList;
