import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Cart from './cart';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeGuitar } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const guitar = makeFakeGuitar();
const guitars = [guitar, guitar];
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

describe('Component: Cart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText('Корзина')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Оформить заказ' })).toBeInTheDocument();
    expect(screen.getAllByTestId('Увеличить количество').length).toEqual(1);
  });
});
