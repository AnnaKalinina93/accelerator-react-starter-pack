import { FilterTypeGuitarRout, guitarType, SortingPriceRout, SortingRatingRout, sortingType } from './const';

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

export function getTypeRout (activeType: string[]): string {
  if (activeType.length) {
    const typeRout:string[] = [];
    activeType.map((type) => typeRout.push(Object(FilterTypeGuitarRout)[type]));
    return typeRout.join('');
  }
  return '';
}

export function getStringsFromType (type: string): string[] {
  switch (type) {
    case guitarType.acoustic:
      return ['6', '7', '12'];
    case guitarType.electric:
      return ['4', '6', '7'];
    case guitarType.ukulele:
      return ['4'];
    default:
      return [];
  }
}
