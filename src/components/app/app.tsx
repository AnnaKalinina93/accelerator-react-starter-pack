import { Switch, Route,  Router as BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import NotFoundScreen from '../../page/not-found-screen/not-found-screen';
import browserHistory from '../../browser-history';
import Catalog from '../../page/catalog/catalog';
import Product from '../../page/product/product';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Catalog/>
        </Route>
        <Route exact path={AppRoute.Product}>
          <Product/>
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
