export enum APIRoute {
  Guitars = '/guitars',
}

export enum AppRoute {
  Catalog = '/catalog',
  Main = '/',
  Pagination = '/page_:id',
  Product = '/product/:id',
}

export enum SortingType {
  Price = 'price',
  Popularity = 'popularity',
}

export enum SortingPrice {
  Increase = 'increase',
  Decrease='decrease',
}
