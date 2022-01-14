import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { APIRoute } from '../../const';
import { State } from '../../types/state';
import { makeFakeGuitar} from '../../utils/mocks';
import { fetchGuitarsAction } from './api-action';
import { guitarsRequest, guitarsSucceeded, guitarsFailed } from './action';

describe('Async offers data actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should guitars when server return 200', async () => {
    const store = mockStore();
    const fakeGuitars = new Array(5).fill(null).map(() => (makeFakeGuitar()));
    mockAPI
      .onGet(`${APIRoute.Guitars}?_embed=comments`)
      .reply(200, fakeGuitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      guitarsRequest(),
      guitarsSucceeded(fakeGuitars),
    ]);
  });

  it('should return guitars error when server return 404', async () => {
    const store = mockStore();

    mockAPI
      .onGet(`${APIRoute.Guitars}?_embed=comments`)
      .reply(404, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      guitarsRequest(),
      guitarsFailed(),
    ]);
  });
});
