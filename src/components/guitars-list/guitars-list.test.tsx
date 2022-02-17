import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { sortingType } from '../../const';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeGuitar } from '../../utils/mocks';
import GuitarsList from './guitars-list';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);


const storeWithLoadingGuitars = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: true,
    guitarsError: false,
    guitars: [],
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
    activeSearch: 1,
    isActivePopupAddCart: false,
    isActivePopupAddCartSuccess: false,
    isActivePopupDeleteGuitarCart: true,
    promoCod: '',
  },
});

const storeWithErrorGuitars = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: false,
    guitarsError: true,
    guitars: [],
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
    activeSearch: 1,
    isActivePopupAddCart: false,
    isActivePopupAddCartSuccess: false,
    isActivePopupDeleteGuitarCart: true,
    promoCod: '',
  },
});

const guitars = new Array(6).fill(null).map(() => (makeFakeGuitar()));

const storeWithGuitars = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: false,
    guitarsError: false,
    guitars,
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
    activeSearch: 1,
    isActivePopupAddCart: false,
    isActivePopupAddCartSuccess: false,
    isActivePopupDeleteGuitarCart: true,
    promoCod: '',
  },
});

describe('Component: GuitarsList', () => {
  it('should render correctly when guitars loading true', () => {
    render(
      <Provider store={storeWithLoadingGuitars}>
        <MemoryRouter>
          <GuitarsList guitars={guitars} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render correctly when guitars error true', () => {
    render(
      <Provider store={storeWithErrorGuitars}>
        <MemoryRouter>
          <GuitarsList guitars={guitars} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Что-то пошло не так. Попробуйте перезагрузить страницу!/i)).toBeInTheDocument();
  });

  it('should render correctly with guitars', () => {
    render(
      <Provider store={storeWithGuitars}>
        <MemoryRouter>
          <GuitarsList guitars={guitars} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getAllByRole('link', { name: 'Подробнее' }).length).toEqual(guitars.slice(0, 9).length);
  });
});
