import { guitarsData } from './guitars-data';
import { guitarsRequest, guitarsFailed, guitarsSucceeded } from './action' ;
import { GuitarsData } from '../../types/state';
import { makeFakeGuitar } from '../../utils/mocks';

const guitars = new Array(5).fill(null).map(()=>(makeFakeGuitar()));
describe('Reduser: GuitarsData', () => {
  it('should change guitars loading in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comments: [],
      commentsLoading: false,
      commentsError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
    };
    expect(guitarsData(state, guitarsRequest()))
      .toEqual({
        guitars: [],
        guitarsLoading: true,
        guitarsError: false,
        guitarsForPrice: [],
        comments: [],
        commentsLoading: false,
        commentsError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
      });
  });

  it('should add guitars in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comments: [],
      commentsLoading: false,
      commentsError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
    };
    expect(guitarsData(state, guitarsSucceeded(guitars)))
      .toEqual({
        guitars: guitars,
        guitarsLoading: false,
        guitarsError: false,
        guitarsForPrice: [],
        comments: [],
        commentsLoading: false,
        commentsError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
      });
  });

  it('should change guitars error in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comments: [],
      commentsLoading: false,
      commentsError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
    };
    expect(guitarsData(state, guitarsFailed()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: true,
        guitarsForPrice: [],
        comments: [],
        commentsLoading: false,
        commentsError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
      });
  });

});
