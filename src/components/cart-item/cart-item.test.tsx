import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import CartItem from './cart-item';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeGuitar } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

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
  },
  [NameSpace.Ui]: {
    activeSearch: 1,
    isActivePopupAddCart: false,
    isActivePopupAddCartSuccess: false,
    isActivePopupDeleteGuitarCart: true,
    promoCod: '',
  },
});

const onDeleteClick = jest.fn();
describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <CartItem guitars={guitars} onDeleteClick={onDeleteClick} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText(guitars[0].name)).toBeInTheDocument();
    expect(screen.getByText(`${guitars[0].price} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId('Уменьшить количество')).toBeInTheDocument();
    expect(screen.getByTestId('Увеличить количество')).toBeInTheDocument();
  });

  it('should call dispatch when click button уменшить количество', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <CartItem guitars={guitars} onDeleteClick={onDeleteClick} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByTestId('Уменьшить количество')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('Уменьшить количество'));
    expect(dispatch).toBeCalledTimes(1);
  });

  it('should call dispatch when click button увеличить количество', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <CartItem guitars={guitars} onDeleteClick={onDeleteClick} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByTestId('Увеличить количество')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('Увеличить количество'));
    expect(dispatch).toBeCalledTimes(1);
  });
});
