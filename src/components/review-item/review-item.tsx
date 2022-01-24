import { nanoid } from 'nanoid';
import { Comment } from '../../types/guitar';
import  dayjs from 'dayjs';
import 'dayjs/locale/ru';

type ReviewProps = {
  comment: Comment,
}

const RATING_COUNT = 5;

function ReviewItem ({ comment }: ReviewProps): JSX.Element {
  return (
    <div key={comment.id} className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {comment.userName}
        </h4>
        <span className="review__date">
          {dayjs(comment.createAt).locale('ru').format('DD MMMM')}
        </span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true">
        <span className="visually-hidden">Рейтинг:</span>
        {new Array(Math.round(comment.rating)).fill(1).map((item) => (
          <svg key={nanoid()} width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
        ))}
        {new Array(RATING_COUNT - Math.round(comment.rating))
          .fill(1)
          .map((item) => (
            <svg key={nanoid()} width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
          ))}
        <span className="rate__count"></span>
        <span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{comment.advantages}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{comment.disadvantages}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}</p>
    </div>
  );
}

export default ReviewItem;
