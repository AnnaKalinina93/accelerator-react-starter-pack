import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FormReview from './form-review';
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
});
const nameGuitar = 'ttt';
const formClass = 'modal modal--review modal-for-ui-kit is-active';
const onClickFormReview = jest.fn();
describe('Component: FormStars', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <FormReview nameGuitar={nameGuitar} guitarId={3} formClass={formClass} onClickFormReview={onClickFormReview} />
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('button', { name: 'Отправить отзыв' })).toBeInTheDocument();
    expect(screen.getByText(nameGuitar)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Ваше Имя Достоинства Недостатки Комментарий' })).toBeInTheDocument();
  });

  it('should call dispatch when user write review', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <FormReview nameGuitar={nameGuitar} guitarId={3} formClass={formClass} onClickFormReview={onClickFormReview} />
        </MemoryRouter>
      </Provider>);

    userEvent.type(screen.getByTestId('userName'), 'keks');
    userEvent.type(screen.getByTestId('advantage'), 'ddd');
    userEvent.type(screen.getByTestId('disadvantage'), 'fff');
    userEvent.type(screen.getByTestId('comment'), 'mmm');
    userEvent.click(screen.getByTestId('3'));

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/fff/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Отправить отзыв/i })).toBeEnabled();

    userEvent.click(screen.getByRole('button', { name: /Отправить отзыв/i }));
    expect(dispatch).toBeCalledTimes(1);
  });
});
