import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeGuitar, makeFakeStore } from '../../utils/mocks';
import GuitarItem from './guitar-item';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);


const guitar = makeFakeGuitar();

const store = mockStore(makeFakeStore());

describe('Component: GuitarItem', () => {
  it('should render correctly with guitars', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <GuitarItem guitar={guitar} onClickAddToCart={jest.fn()} />
        </MemoryRouter>
      </Provider>);
    expect(screen.getByAltText(guitar.name)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Подробнее' })).toBeInTheDocument();
    expect(screen.getByTestId('Купить')).toBeInTheDocument();

  });
});
