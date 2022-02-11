import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Catalog from '../catalog/catalog';
import Product from '../product/product';
import Cart from '../cart/cart';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Catalog />
      </Route>
      <Route exact path={AppRoute.Product}>
        <Product />
      </Route>
      <Route exact path={AppRoute.Cart}>
        <Cart />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
