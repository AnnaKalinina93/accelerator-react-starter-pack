import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Product from './product';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeGuitar } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const guitars = new Array(6).fill(null).map(()=>(makeFakeGuitar()));
const storeWithGuitars = mockStore({
  [NameSpace.Guitars]: {
    guitarsLoading: false,
    guitarsError: false,
    guitars,
  },
});


describe('Component: Product', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitars}>
        <MemoryRouter>
          <Product/>
        </MemoryRouter>
      </Provider>);


    expect(screen.getByText(/Описание товара/i)).toBeInTheDocument();
  });
});
