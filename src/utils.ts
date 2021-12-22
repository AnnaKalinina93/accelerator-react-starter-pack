import { SortingPriceRout, SortingRatingRout, sortingType } from './const';

export function getSortRout(activeSorting: {
  type: string
  order: string
}): {
  sortPrice: SortingPriceRout
  rating: SortingRatingRout
} {
  switch (JSON.stringify(activeSorting)) {
    case JSON.stringify({
      type: sortingType.type.price,
      order: sortingType.order.increase,
    }):
      return {
        sortPrice: SortingPriceRout.Increase,
        rating: SortingRatingRout.Default,
      };
    case JSON.stringify({
      type: sortingType.type.price,
      order: sortingType.order.decrease,
    }):
      return {
        sortPrice: SortingPriceRout.Decrease,
        rating: SortingRatingRout.Default,
      };
    case JSON.stringify({
      type: sortingType.type.price,
      order: sortingType.order.default,
    }):
      return {
        sortPrice: SortingPriceRout.Increase,
        rating: SortingRatingRout.Default,
      };
    case JSON.stringify({
      type: sortingType.type.rating,
      order: sortingType.order.increase,
    }):
      return {
        sortPrice: SortingPriceRout.Default,
        rating: SortingRatingRout.Increase,
      };
    case JSON.stringify({
      type: sortingType.type.rating,
      order: sortingType.order.decrease,
    }):
      return {
        sortPrice: SortingPriceRout.Default,
        rating: SortingRatingRout.Decrease,
      };
    case JSON.stringify({
      type: sortingType.type.rating,
      order: sortingType.order.default,
    }):
      return {
        sortPrice: SortingPriceRout.Default,
        rating: SortingRatingRout.Increase,
      };
    case JSON.stringify({
      type: sortingType.type.default,
      order: sortingType.order.increase,
    }):
      return {
        sortPrice: SortingPriceRout.Increase,
        rating: SortingRatingRout.Default,
      };
    case JSON.stringify({
      type: sortingType.type.default,
      order: sortingType.order.decrease,
    }):
      return {
        sortPrice: SortingPriceRout.Decrease,
        rating: SortingRatingRout.Default,
      };
    default:
      return {
        sortPrice: SortingPriceRout.Default,
        rating: SortingRatingRout.Default,
      };
  }
}
