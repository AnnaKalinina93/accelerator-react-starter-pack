import { guitarsData } from './guitars-data';
import { guitarsRequest, guitarsFailed, guitarsSucceeded, guitarSucceeded, guitarRequest, guitarFailed, commentRequest, commentSucceeded, commentFailed, postReviewReset, searchGuitarsSucceeded, addCartGuitars, removalCartGuitars, countCartGuitarsChange, discountSucceeded, isPostCoupon } from './action' ;
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
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, guitarsRequest()))
      .toEqual({
        guitars: [],
        guitarsLoading: true,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should add guitars in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, guitarsSucceeded(guitars)))
      .toEqual({
        guitars: guitars,
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should change guitars error in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, guitarsFailed()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: true,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });


  it('should add search guitars in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, searchGuitarsSucceeded(guitars)))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: guitars,
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });
  it('should add guitar in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, guitarSucceeded(guitar)))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: guitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should add guitar loading in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, guitarRequest()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: true,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should add guitar error in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, guitarFailed()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: true,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should add comment in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: guitar,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    const newGuitar = {
      ...guitar,
      comments: [comment, ...guitar.comments]};
    expect(guitarsData(state, commentSucceeded(comment)))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: comment,
        commentLoading: false,
        commentError: false,
        guitar: newGuitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: true,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should add comment loading in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, commentRequest()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: true,
        commentError: false,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });


  it('should add comment error in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: null,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, commentFailed()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: true,
        guitar: null,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should reset review in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: comment,
      commentLoading: false,
      commentError: false,
      guitar: guitar,
      guitarLoading: false,
      guitarError: false,
      isPostComment: true,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, postReviewReset()))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: guitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should change cartGuitars when adding guitar in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: guitar,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, addCartGuitars(guitar)))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: guitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[guitar],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should change cartGuitars when remove guitar in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: guitar,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[guitar],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, removalCartGuitars(guitar)))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: guitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should change cartGuitars when adding 2 guitar in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: guitar,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, countCartGuitarsChange(guitar, 2)))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: guitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[guitar, guitar],
        discount: 0,
        isPostCoupon: null,
      });
  });

  it('should change discount in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: guitar,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, discountSucceeded(15)))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: guitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 15,
        isPostCoupon: null,
      });
  });

  it('should change isPostCoupon in state', () => {
    const state: GuitarsData = {
      guitars: [],
      guitarsLoading: false,
      guitarsError: false,
      searchGuitars: [],
      comment: null,
      commentLoading: false,
      commentError: false,
      guitar: guitar,
      guitarLoading: false,
      guitarError: false,
      isPostComment: false,
      totalGuitars:9,
      cartGuitars:[],
      discount: 0,
      isPostCoupon: null,
    };
    expect(guitarsData(state, isPostCoupon(true)))
      .toEqual({
        guitars: [],
        guitarsLoading: false,
        guitarsError: false,
        searchGuitars: [],
        comment: null,
        commentLoading: false,
        commentError: false,
        guitar: guitar,
        guitarLoading: false,
        guitarError: false,
        isPostComment: false,
        totalGuitars:9,
        cartGuitars:[],
        discount: 0,
        isPostCoupon: true,
      });
  });
});
