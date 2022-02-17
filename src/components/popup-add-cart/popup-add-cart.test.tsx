import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import PopupAddCart from './popup-add-cart';
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
describe('Component: PopupAddCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <PopupAddCart guitar={guitar} classPopup={'modal modal-for-ui-kit is-active'}/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('button', { name: 'Добавить в корзину' })).toBeInTheDocument();
    expect(screen.getByText(guitar.name)).toBeInTheDocument();
  });

  it('should call dispatch when click button Добавить в корзину', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <PopupAddCart guitar={guitar} classPopup={'modal modal-for-ui-kit is-active'}/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('button', { name: 'Добавить в корзину' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Добавить в корзину' }));
    expect(dispatch).toBeCalledTimes(3);
  });
});
