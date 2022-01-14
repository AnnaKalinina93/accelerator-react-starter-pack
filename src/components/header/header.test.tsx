
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { makeFakeStore } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);
const store = mockStore(makeFakeStore);
const onChangeInput = jest.fn();
const fakeHeader = (
  <Provider store={store}>
    <MemoryRouter>
      <Header onChangeInput={onChangeInput}/>
    </MemoryRouter>
  </Provider>);

describe('Component: Header', () => {

  it('should render correctly', () => {
    render(fakeHeader);

    expect(screen.getByRole('link', {name: 'Каталог'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Где купить?'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'О компании'})).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('form-search__input');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call function when user enters search', () => {
    render(fakeHeader);

    expect(screen.getByRole('textbox')).toHaveClass('form-search__input');
    userEvent.type(screen.getByRole('textbox'), 'curt');
    expect(onChangeInput).toBeCalledTimes(4);
  });

});
