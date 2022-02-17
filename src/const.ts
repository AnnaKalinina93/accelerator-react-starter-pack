export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
}

export enum AppRoute {
  Main = '/',
  Product = '/product/:id',
  Cart = '/cart',
}

export enum SortingRout {
  Default = '',
  Type = '_sort',
  Order= '_order',
}

export enum FilterPriceRout {
  Default = '',
  From = 'price_gte',
  To = 'price_lte',
}

export const sortingType = {
  type: {
    default: 'defaultType',
    price: 'price',
    rating: 'rating',
  },
  order: {
    default: 'defaultOrder',
    increase: 'asc',
    decrease: 'desc',
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

export const guitarTranslate: GuitarTranslate  = {
  acoustic: 'Акустическая гитара',
  electric: 'Электрогитара',
  ukulele: 'Укулеле',
};

type GuitarTranslate = { [key: string]: string};

export const activeTabs = {
  description: 'description',
  characteristics: 'characteristics',
};

export const ratingMap = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
};
