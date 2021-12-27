export enum APIRoute {
  Guitars = '/guitars',
}

export enum AppRoute {
  Catalog = '/catalog',
  Main = '/:id',
  Pagination = '/page_:id',
  Product = '/product/:id',
}

export enum SortingPriceRout {
  Default = '',
  Increase = '&_sort=price&_order=asc',
  Decrease = '&_sort=price&_order=desc',
}

export enum SortingRatingRout {
  Default = '',
  Increase = '&_sort=rating&_order=asc',
  Decrease='&_sort=rating&_order=desc',
}

export enum FilterPriceRout {
  default = '',
  from = '&price_gte=',
  to = '&price_lte=',
}

export enum FilterTypeGuitarRout {
  default = '',
  acoustic = '&type=acoustic',
  electric = '&type=electric',
  ukulele = '&type=ukulele',
}

export const sortingType = {
  type: {
    default: 'defaultType',
    price: 'price',
    rating: 'rating',
  },
  order: {
    default: 'defaultOrder',
    increase: 'increase',
    decrease: 'decrease',
  },
};

export const guitarType = {
  default: 'default',
  acoustic: 'acoustic',
  electric: 'electric',
  ukulele: 'ukulele',
};

export const guitarsType = {
  acoustic: 'Акустические гитары',
  electric: 'Электрогитары',
  ukulele: 'Укулеле',
};

export const numberOfString = {
  4: '4-strings',
  6: '6-strings',
  7: '7-strings',
  12: '12-strings',
};
