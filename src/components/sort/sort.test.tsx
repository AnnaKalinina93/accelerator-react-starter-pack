import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeGuitar } from '../../utils/mocks';
import Sort from './sort';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/root-reduser';
import { sortingType } from '../../const';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

const mockStore = configureMockStore([thunk]);


const guitars = new Array(27).fill(null).map(() => (makeFakeGuitar()));

const store = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: false,
    guitarsError: false,
    guitars,
  },
  [NameSpace.Ui]: {
    activeSort: {
      type: sortingType.type.default,
      order: sortingType.order.default,
    },
    minPrice: '',
    maxPrice: '',
    typeGuitar: [],
    activeStrings: [],
    activePage: 1,
  },
});

const fakeSort = (
  <Provider store={store}>
    <MemoryRouter>
      <Sort />
    </MemoryRouter>
  </Provider>
);

describe('Component: Sort', () => {
  it('should render correctly', () => {
    render(fakeSort);

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'по цене' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'по популярности' })).toBeInTheDocument();
  });

  it('should сhange sort on popular when click button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeSort);

    expect(screen.getByRole('button', { name: 'по популярности' })).toHaveClass('catalog-sort__type-button');
    userEvent.click(screen.getByRole('button', { name: 'по популярности' }));
    expect(dispatch).toBeCalledTimes(3);
  });
});
