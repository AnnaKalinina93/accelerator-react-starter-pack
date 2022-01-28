import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Breadcrumbs from './breadcrumbs';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../store/root-reduser';
import { makeFakeGuitar } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';

const history = createMemoryHistory();

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

const name='ssss';
describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithGuitar}>
        <MemoryRouter>
          <Breadcrumbs name={name}/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('link',{name: 'Каталог'})).toBeInTheDocument();
    expect(screen.getByTestId('Товар')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Breadcrumbs/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link',{name: 'Каталог'}));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
