import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeGuitar } from '../../utils/mocks';
import Pagination from './pagination';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/root-reduser';
import { sortingType } from '../../const';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

const mockStore = configureMockStore([thunk]);


const guitars = new Array(27).fill(null).map(()=>(makeFakeGuitar()));

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

const fakePagination = (
  <Provider store={store}>
    <MemoryRouter>
      <Pagination pageCount={3}/>
    </MemoryRouter>
  </Provider>
);

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(fakePagination);

    expect(screen.getByTestId('1')).toBeInTheDocument();
    expect(screen.getByTestId('2')).toBeInTheDocument();
    expect(screen.getByTestId('3')).toBeInTheDocument();
    expect(screen.getByTestId('далее')).toBeInTheDocument();
  });

  it('should сhange active page when click page=2', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakePagination);

    expect(screen.getByTestId('2')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('2'));
    expect(dispatch).toBeCalledTimes(1);

  });
});
