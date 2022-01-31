type RatingPanelProps = {
  count?: number,
  rating: number;
}
const RATING_COUNT = 5;

function RatingPanel({ rating, count }: RatingPanelProps): JSX.Element {
  return (
    <div className="rate review__rating-panel" aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {Array.from(Array(Math.round(rating)).keys()).map((item) => (
        <svg key={`${item}-full`} data-testid="full" width="12" height="11" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
      ))}
      {Array.from(Array(RATING_COUNT - Math.round(rating)).keys())
        .map((item) => (
          <svg key={`${item}-notFull`} data-testid="notFull" width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
        ))}
      <span className="rate__count">{count ?? ''}</span>
      <span className="rate__message"></span>
    </div>
  );
}

export default RatingPanel;

