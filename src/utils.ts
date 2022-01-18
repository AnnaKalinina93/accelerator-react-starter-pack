import { FilterPriceRout, guitarsType, guitarType, SortingRout, sortingType } from './const';

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

export function getTypesFromStrings ( string: string): string[] {
  switch (string) {
    case '4':
      return [guitarsType.electric, guitarsType.ukulele];
    case '6':
      return [guitarsType.acoustic, guitarsType.electric];
    case '7':
      return [guitarsType.acoustic, guitarsType.electric];
    case '12':
      return [guitarsType.acoustic];
    default:
      return[];
  }
}

export function getNewParams (activeSorting: {type: string, order: string}, activeMinPrice: string, activeMaxPrice: string, activeGuitarTypes: string[], activePage?: number, activeStrings?: string[]): URLSearchParams {
  const params = new URLSearchParams('');
  if (activeSorting.type !== sortingType.type.default && activeSorting.order !== sortingType.order.default) {
    params.set(SortingRout.Type, activeSorting.type);
    params.set(SortingRout.Order, activeSorting.order);
  }
  if (activeSorting.type !== sortingType.type.default && activeSorting.order === sortingType.order.default) {
    params.set(SortingRout.Type, activeSorting.type);
    params.set(SortingRout.Order, sortingType.order.increase);
  }
  if (activeSorting.type === sortingType.type.default && activeSorting.order !== sortingType.order.default) {
    params.set(SortingRout.Type, sortingType.type.price);
    params.set(SortingRout.Order, activeSorting.order);
  }
  if (activeMinPrice) {
    params.set(FilterPriceRout.from, activeMinPrice);
  }
  if (activeMaxPrice) {
    params.set(FilterPriceRout.to, activeMaxPrice);
  }
  if (activeGuitarTypes.length) {
    activeGuitarTypes.map((type)=>params.append('type', type));
  }
  if (activePage !== 1 && activePage) {
    params.set('page_', String(activePage));
  }
  if (activeStrings && activeStrings.length) {
    activeStrings.forEach((item)=>params.append('strings', item));
  }
  return params;
}
