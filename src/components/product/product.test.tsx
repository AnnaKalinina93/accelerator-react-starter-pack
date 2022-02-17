import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Product from './product';
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
    searchGuitars: [],
    cartGuitars: guitars,
  },
  [NameSpace.Ui]: {
    activeSearch: 1,
    isActivePopupAddCart: false,
    isActivePopupAddCartSuccess: false,
    isActivePopupDeleteGuitarCart: true,
    promoCod: '',
  },
});

const storeWithGuitarLoading = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: false,
    guitarsError: false,
    guitars,
    guitar: null,
    guitarLoading: true,
    guitarError: false,
    searchGuitars: [],
    cartGuitars: guitars,
  },
  [NameSpace.Ui]: {
    activeSearch: 1,
    isActivePopupAddCart: false,
    isActivePopupAddCartSuccess: false,
    isActivePopupDeleteGuitarCart: true,
    promoCod: '',
  },
});

const storeWithGuitarError = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: false,
    guitarsError: false,
    guitars,
    guitar: null,
    guitarLoading: false,
    guitarError: true,
    searchGuitars: [],
    cartGuitars: guitars,
  },
  [NameSpace.Ui]: {
    activeSearch: 1,
    isActivePopupAddCart: false,
    isActivePopupAddCartSuccess: false,
    isActivePopupDeleteGuitarCart: true,
    promoCod: '',
  },
});

describe('Component: Product', () => {
  it('should render correctly with guitar', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <Product />
        </MemoryRouter>
      </Provider>);


    expect(screen.getByAltText(guitar.name)).toBeInTheDocument();
    expect(screen.getByText(guitar.description)).toBeInTheDocument();
    expect(screen.getByTestId('Добавить в корзину')).toBeInTheDocument();
  });

  it('should render correctly when guitar loading', () => {
    render(
      <Provider store={storeWithGuitarLoading}>
        <MemoryRouter>
          <Product />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });


  it('should render correctly when guitar error', () => {
    render(
      <Provider store={storeWithGuitarError}>
        <MemoryRouter>
          <Product />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(/Что-то пошло не так. Попробуйте перезагрузить страницу!/i)).toBeInTheDocument();
  });
});
