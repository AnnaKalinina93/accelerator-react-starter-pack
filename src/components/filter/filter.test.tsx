import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeGuitar } from '../../utils/mocks';
import Filter from './filter';
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

const fakeFilter = (
  <Provider store={store}>
    <MemoryRouter>
      <Filter/>
    </MemoryRouter>
  </Provider>
);

describe('Component: Filter', () => {
  it('should render correctly', () => {
    render(fakeFilter);

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByRole('group', {name: 'Цена, ₽'})).toBeInTheDocument();
    expect(screen.getByRole('group', {name: 'Тип гитар'})).toBeInTheDocument();
    expect(screen.getByRole('group', {name: 'Количество струн'})).toBeInTheDocument();
    expect(screen.getByRole('checkbox', {name: 'Акустические гитары'})).toBeInTheDocument();
    expect(screen.getByRole('checkbox', {name: '6'})).toBeInTheDocument();

  });

  it('should сhange type guitar when click checkbox', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilter);

    expect(screen.getByRole('checkbox', {name: 'Акустические гитары'})).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox', {name: 'Акустические гитары'}));
    expect(dispatch).toBeCalledTimes(2);
  });

  it('should сhange activeStrings guitar when click checkbox Количесвто струн', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilter);

    expect(screen.getByRole('checkbox', {name: '6'})).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox', {name: '6'}));
    expect(dispatch).toBeCalledTimes(2);
  });

  it('should сhange minPrice when write input', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilter);

    expect(screen.getByTestId('minPrice')).toBeInTheDocument();
    userEvent.type(screen.getByTestId('minPrice'), '2000');
    expect(dispatch).toBeCalledTimes(4);
  });
});
