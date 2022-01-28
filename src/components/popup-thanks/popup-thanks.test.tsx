import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import PopupThanks from './popup-thanks';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeGuitar } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

const mockStore = configureMockStore([thunk]);

const guitars = new Array(6).fill(null).map(()=>(makeFakeGuitar()));
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
});
describe('Component: Popupthanks', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <PopupThanks/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('button',{name: 'К покупкам!'})).toBeInTheDocument();
    expect(screen.getByTestId('Закрыть')).toBeInTheDocument();
  });

  it('should call dispatch when click button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <PopupThanks/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('button',{name: 'К покупкам!'})).toBeInTheDocument();
    userEvent.click(screen.getByRole('button',{name: 'К покупкам!'}));
    expect(dispatch).toBeCalledTimes(1);
  });
});
