export enum APIRoute {
  Guitars = '/guitars',
}

export enum AppRoute {
  Catalog = '/catalog',
  Main = '/',
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

export const sortingType = {
  type: {
    default: 'default',
    price: 'price',
    rating: 'rating',
  },
  order: {
    default: 'default',
    increase: 'increase',
    decrease: 'decrease',
  },
};
