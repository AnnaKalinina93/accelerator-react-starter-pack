import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { redirect } from './redirect';
import { redirectToRoute } from './action';
import { AppRoute } from '../../const';
import { State } from '../../types/state';

const fakeHistory = {
  location: { pathname: '' },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /product', () => {
    store.dispatch(redirectToRoute(AppRoute.Product));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Product);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Product),
    ]);
  });
});
