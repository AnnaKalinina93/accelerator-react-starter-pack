import { Comment } from '../../types/guitar';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import RatingPanel from '../rating-panel/rating-panel';

type ReviewProps = {
  comment: Comment
}

function ReviewItem({ comment }: ReviewProps): JSX.Element {
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
      <RatingPanel rating={comment.rating} />
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{comment.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{comment.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}</p>
    </div>
  );
}

export default ReviewItem;
