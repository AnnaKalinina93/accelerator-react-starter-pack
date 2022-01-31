import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ReviewItem from './review-item';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeComment, makeFakeGuitar } from '../../utils/mocks';

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
const comment = makeFakeComment();
describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <ReviewItem comment={comment} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('heading', { name: 'Комментарий:' })).toBeInTheDocument();
    expect(screen.getByText(comment.advantage)).toBeInTheDocument();
    expect(screen.getByText(comment.userName)).toBeInTheDocument();
  });
});
