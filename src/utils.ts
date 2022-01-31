import { FilterPriceRout, guitarsType, guitarType, SortingRout, sortingType } from './const';
import { Guitar } from './types/guitar';

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

export function getNewParams (activeSorting: {type: string, order: string}, activeMinPrice: string, activeMaxPrice: string, activeGuitarTypes: string[], activeStrings?: string[], activeSearch?:string, activePage?: number): URLSearchParams {
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
    params.set(FilterPriceRout.From, activeMinPrice);
  }
  if (activeMaxPrice) {
    params.set(FilterPriceRout.To, activeMaxPrice);
  }
  if (activeGuitarTypes.length) {
    activeGuitarTypes.map((type)=>params.append('type', type));
  }
  if (activePage) {
    params.append('_start',String((activePage-1)*9));
    params.append('_end',String(activePage*9));
  }
  if (activeStrings && activeStrings.length) {
    activeStrings.forEach((item)=>params.append('stringCount', item));
  }
  if (activeSearch && activeSearch !== '') {
    params.append('name_like',activeSearch);
  }
  return params;
}

export function getSortInput (guitars: Guitar[], value: string): Guitar[] {
  return [...guitars].sort((a,b)=> {
    const index1 = a.name.toLowerCase().indexOf(value.toLowerCase());
    const index2 = b.name.toLowerCase().indexOf(value.toLowerCase());
    if ( index1 > index2) { return 1;}
    if ( index2> index1) { return -1;}
    return 0;
  });
}
