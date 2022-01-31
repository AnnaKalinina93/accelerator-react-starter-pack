import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ReviewsList from './reviews-list';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeComment, makeFakeGuitar } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);

const guitars = new Array(6).fill(null).map(() => (makeFakeGuitar()));
const guitar = makeFakeGuitar();
const storeWithGuitar = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: false,
    guitarsError: false,
    guitars,
    guitar,
    guitarLoading: false,
    guitarError: false,
  },
});
const comments = new Array(6).fill(null).map(() => (makeFakeComment()));
const onClickFormReview = jest.fn();
describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <ReviewsList comments={comments} onClickFormReview={onClickFormReview} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: 'Комментарий:' }).length).toEqual(guitar.comments.slice(0, 3).length);
    expect(screen.getByRole('button', { name: 'Показать еще отзывы' })).toBeInTheDocument();
  });
  it('should render popup review', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <ReviewsList comments={comments} onClickFormReview={onClickFormReview} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByTestId('Оставить отзыв')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('Оставить отзыв'));
    expect(onClickFormReview).toBeCalledTimes(1);
  });
});
