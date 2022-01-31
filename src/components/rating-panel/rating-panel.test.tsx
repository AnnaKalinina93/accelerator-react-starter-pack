import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import RatingPanel from './rating-panel';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeGuitar } from '../../utils/mocks';

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
const count = 10;
const rating = 4;
describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <RatingPanel count={count} rating={rating} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getAllByTestId('full').length).toEqual(4);
    expect(screen.getByTestId('notFull')).toBeInTheDocument();
    expect(screen.getByText(count)).toBeInTheDocument();

  });
});
