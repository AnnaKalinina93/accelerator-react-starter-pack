import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import PopupAddToCartSucceeded from './popup-add-to-cart-succeeded';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeGuitar } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

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
  [NameSpace.Ui]: {
    isActivePopupAddCart: false,
    isActivePopupAddCartSuccess: false,
    isActivePopupDeleteGuitarCart: true,
    promoCod: '',
  },
});
describe('Component: PopupAddCartSucceeded', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <PopupAddToCartSucceeded classSucceeded={'modal modal--success modal-for-ui-kit is-active'} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('button', { name: 'Перейти в корзину' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Продолжить покупки' })).toBeInTheDocument();
  });

  it('should call dispatch when click button Удалить товар', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <PopupAddToCartSucceeded classSucceeded={'modal modal--success modal-for-ui-kit is-active'} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('button', { name: 'Перейти в корзину' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Перейти в корзину' }));
    expect(dispatch).toBeCalledTimes(2);
  });

  it('should call dispatch when click button Продолжить покупки', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <PopupAddToCartSucceeded classSucceeded={'modal modal--success modal-for-ui-kit is-active'} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('button', { name: 'Продолжить покупки' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Продолжить покупки' }));
    expect(dispatch).toBeCalledTimes(2);
  });
});
