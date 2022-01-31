import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../const';
import App from './app';
import { makeFakeStore } from '../../utils/mocks';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();

const store = mockStore(makeFakeStore());
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Catalog" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByRole('link', { name: 'Каталог' })).toBeInTheDocument();
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

  it('should render "Product" when user navigate to "/product"', () => {
    history.push(AppRoute.Product);
    render(fakeApp);

    expect(
      screen.getByRole('link', { name: 'Добавить в корзину' }),
    ).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
