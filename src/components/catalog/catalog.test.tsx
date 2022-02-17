import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { sortingType } from '../../const';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeGuitar } from '../../utils/mocks';
import Catalog from './catalog';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const guitars = new Array(6).fill(null).map(() => (makeFakeGuitar()));


const storeWithLoadingGuitars = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: true,
    guitarsError: false,
    guitars: [],
    guitarsForPrice: [],
    searchGuitars: [],
    cartGuitars: guitars,
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

const storeWithErrorGuitars = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: false,
    guitarsError: true,
    guitars: [],
    guitarsForPrice: [],
    searchGuitars: [],
    cartGuitars: guitars,
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


const storeWithGuitars = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: false,
    guitarsError: false,
    guitars,
    guitarsForPrice: [],
    searchGuitars: [],
    cartGuitars: guitars,
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

describe('Component: Catalog', () => {
  it('should render correctly when guitars loading true', () => {
    render(
      <Provider store={storeWithLoadingGuitars}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render correctly when guitars error true', () => {
    render(
      <Provider store={storeWithErrorGuitars}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Что-то пошло не так. Попробуйте перезагрузить страницу!/i)).toBeInTheDocument();
  });

  it('should render correctly with guitars', () => {
    render(
      <Provider store={storeWithGuitars}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('link', { name: 'Каталог' })).toBeInTheDocument();
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Подробнее' }).length).toEqual(guitars.slice(0, 9).length);
  });
});
