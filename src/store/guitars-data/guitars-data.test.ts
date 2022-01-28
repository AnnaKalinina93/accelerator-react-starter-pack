import { guitarsData } from './guitars-data';
import { guitarsRequest, guitarsFailed, guitarsSucceeded, guitarSucceeded, guitarRequest, guitarFailed, commentRequest, commentSucceeded, commentFailed, postReviewReset } from './action' ;
import { GuitarsData } from '../../types/state';
import { makeFakeComment, makeFakeGuitar } from '../../utils/mocks';

const guitars = new Array(5).fill(null).map(()=>(makeFakeGuitar()));
const guitar = makeFakeGuitar();
const comment = makeFakeComment();
describe('Reduser: GuitarsData', () => {
  it('should change guitars loading in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
    };
    expect(guitarsData(state, guitarsRequest()))
      .toEqual({
        guitars: [],
        guitarsLoading: true,
        guitarsError: false,
        guitarsForPrice: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
      });
  });

  it('should add guitars in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
    };
    expect(guitarsData(state, guitarsSucceeded(guitars)))
      .toEqual({
        guitars: guitars,
        guitarsLoading: false,
        guitarsError: false,
        guitarsForPrice: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
      });
  });

  it('should change guitars error in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
    };
    expect(guitarsData(state, guitarsFailed()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: true,
        guitarsForPrice: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
      });
  });

  it('should add guitar in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
    };
    expect(guitarsData(state, guitarSucceeded(guitar)))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsForPrice: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: guitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
      });
  });

  it('should add guitar loading in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
    };
    expect(guitarsData(state, guitarRequest()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsForPrice: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: true,
        guitarError: false,
        isPostComment: false,
      });
  });

  it('should add guitar error in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
    };
    expect(guitarsData(state, guitarFailed()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsForPrice: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: true,
        isPostComment: false,
      });
  });

  it('should add comment in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: guitar,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
    };
    const newGuitar = {
      ...guitar,
      comments: [comment, ...guitar.comments]};
    expect(guitarsData(state, commentSucceeded(comment)))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsForPrice: [],
        comment: comment,
        commentLoading: false,
        commentError: false,
        guitar: newGuitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: true,
      });
  });

  it('should add comment loading in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
    };
    expect(guitarsData(state, commentRequest()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsForPrice: [],
        comment: null,
        commentLoading: true,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
      });
  });


  it('should add comment error in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
    };
    expect(guitarsData(state, commentFailed()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsForPrice: [],
        comment: null,
        commentLoading: false,
        commentError: true,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
      });
  });

  it('should reset review in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsForPrice: [],
      comment: comment,
      commentLoading: false,
      commentError: false,
      guitar: guitar,
      guitarLoading: false,
      guitarError: false,
      isPostComment: true,
    };
    expect(guitarsData(state, postReviewReset()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsForPrice: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: guitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
      });
  });
});
