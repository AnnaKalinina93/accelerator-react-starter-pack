import { Guitar } from './guitar';
import { RootState } from '../store/root-reduser';


export type State = RootState;

// export type UserProcess = {
//   authorizationStatus: AuthorizationStatus,
//   loginLoading: boolean,
//   user: AuthInfo | null,
// };

export type GuitarsData = {
  guitars: Guitar[],
  guitarsLoading: boolean,
  guitarsError: boolean,
}

// export type CommentsData = {
//   reviews: Reviews,
//   reviewsLoading: boolean,
//   reviewsError: boolean,
//   isPostReview: boolean,
// }

// export type UiState = {
//   activeCity: string,
//   activeSortType: string,
// }

// export type FavoritesData = {
//   favoritesOffers: Offers,
//   favoritesOffersLoading: boolean,
//   favoritesOffersError: boolean,
//   favoritesOffer: Offer | null,
// }
