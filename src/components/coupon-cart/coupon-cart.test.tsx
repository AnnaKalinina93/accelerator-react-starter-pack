import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import CouponCart from './coupon-cart';
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

describe('Component: CouponCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <CouponCart/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByText('Промокод на скидку')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Применить'})).toBeInTheDocument();
  });

  it('should render correctly when user write input and click button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <CouponCart/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByTestId('coupon')).toBeInTheDocument();
    userEvent.type(screen.getByTestId('coupon'), 'aaa');
    expect(screen.getByTestId('coupon')).toHaveValue('aaa');
    userEvent.click(screen.getByRole('button', {name: 'Применить'}));
    expect(dispatch).toBeCalledTimes(2);
  });
});
