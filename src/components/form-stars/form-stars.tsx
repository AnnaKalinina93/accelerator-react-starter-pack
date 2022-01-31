import { ChangeEvent } from 'react';

type FormStarsProps = {
  count: string,
  title: string,
  onStartChange: ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
}

function FormStars({ count, title, value, onStartChange }: FormStarsProps): JSX.Element {
  return (
    <>
      <input
        className="visually-hidden"
        type="radio"
        id={`star-${count}`}
        name="rating"
        value={count}
        checked={count === value}
        data-testid={count}
        onChange={onStartChange}
      />
      <label className="rate__label" htmlFor={`star-${count}`} title={title}></label>
    </>
  );
}

export default FormStars;
