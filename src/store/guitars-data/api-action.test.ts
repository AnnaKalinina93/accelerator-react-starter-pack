import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { APIRoute } from '../../const';
import { State } from '../../types/state';
import { makeFakeGuitar} from '../../utils/mocks';
import { fetchGuitarAction, fetchGuitarsAction, fetchGuitarsForMaxPrice, fetchGuitarsForMinPrice, postComment } from './api-action';
import { guitarsRequest, guitarsSucceeded, guitarsFailed, commentRequest, commentSucceeded, guitarSucceeded, guitarRequest, guitarFailed, totalGuitars } from './action';
import { Comment, PostComment } from '../../types/guitar';
import { maxPriceChange, minPriceChange } from '../ui-state/action';

describe('Async guitars data actions', () => {
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
    const fakeGuitars = new Array(9).fill(null).map(() => (makeFakeGuitar()));
    const totalCount = 27;
    mockAPI
      .onGet(`${APIRoute.Guitars}?_embed=comments&_start=0&_end=9`)
      .reply(200, fakeGuitars, {'x-total-count': `${totalCount}`});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      guitarsRequest(),
      totalGuitars(totalCount),
      guitarsSucceeded(fakeGuitars),
    ]);
  });

  it('should return guitars error when server return 404', async () => {
    const store = mockStore();

    mockAPI
      .onGet(`${APIRoute.Guitars}?_embed=comments&_start=0&_end=9`)
      .reply(404, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      guitarsRequest(),
      guitarsFailed(),
    ]);
  });

  it('should guitars for min price when server return 200', async () => {
    const store = mockStore();
    const fakeGuitars = [makeFakeGuitar()];
    mockAPI
      .onGet(`${APIRoute.Guitars}?&_sort=price&_order=asc&_start=0&_end=1`)
      .reply(200, fakeGuitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarsForMinPrice());

    expect(store.getActions()).toEqual([
      minPriceChange( String(fakeGuitars[0].price)),
    ]);
  });

  it('should guitars for max price when server return 200', async () => {
    const store = mockStore();
    const fakeGuitars = [makeFakeGuitar()];
    mockAPI
      .onGet(`${APIRoute.Guitars}?&_sort=price&_order=desc&_start=0&_end=1`)
      .reply(200, fakeGuitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarsForMaxPrice());

    expect(store.getActions()).toEqual([
      maxPriceChange( String(fakeGuitars[0].price)),
    ]);
  });

  it('should post comment on server and return new reviews', async () => {
    const store = mockStore();
    const fakePostComment: PostComment = {
      userName: 'Anna',
      advantage: 'goog guitar',
      disadvantage: 'rich',
      comment: 'good',
      rating: 4,
      guitarId: 5,
    };
    const newComment: Comment = {
      userName: 'Anna',
      advantage: 'goog guitar',
      disadvantage: 'rich',
      comment: 'good',
      rating: 4,
      guitarId: 5,
      id: '3',
      createAt: '333333',
    };

    mockAPI
      .onPost(`${APIRoute.Comments}`)
      .reply(200, newComment);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postComment(fakePostComment));

    expect(store.getActions()).toEqual([
      commentRequest(),
      commentSucceeded(newComment),
    ]);
  });

  it('should guitar when server return 200', async () => {
    const store = mockStore();
    const fakeGuitar = makeFakeGuitar();
    const id = '5';
    fakeGuitar.id = Number(id);
    mockAPI
      .onGet(`${APIRoute.Guitars}/${id}?_embed=comments`)
      .reply(200, fakeGuitar);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarAction(id));

    expect(store.getActions()).toEqual([
      guitarRequest(),
      guitarSucceeded(fakeGuitar),
    ]);
  });

  it('should return guitar error when server return 404', async () => {
    const store = mockStore();
    const id = '5';

    mockAPI
      .onGet(`${APIRoute.Guitars}/${id}?_embed=comments`)
      .reply(404, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarAction(id));

    expect(store.getActions()).toEqual([
      guitarRequest(),
      guitarFailed(),
    ]);
  });
});
