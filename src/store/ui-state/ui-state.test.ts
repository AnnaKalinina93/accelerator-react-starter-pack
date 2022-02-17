import { uiState } from './ui-state';
import { sortChangeOrder, sortChangeType, activePageChange, numberOfStringChange, typeGuitarChange, minPriceChange, maxPriceChange, isActivePopupAddCartChange, isActivePopupAddCartSuccessChange, isActivePopupDeleteGuitarCartChange, promoCodAdding} from './action' ;
import { UiState } from '../../types/state';
import { guitarsType, sortingType } from '../../const';
describe('Reduser: UiState', () => {
  it('should change sort order in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, sortChangeOrder(sortingType.order.increase)))
      .toEqual({
        activeSort: {
          type: sortingType.type.default,
          order: sortingType.order.increase,
        },
        minPrice: '',
        maxPrice: '',
        typeGuitar: [],
        activeStrings: [],
        activePage: 1,
        activeSearch: '',
        isActivePopupAddCart: false,
        isActivePopupAddCartSuccess: false,
        isActivePopupDeleteGuitarCart: false,
        promoCod: '',
      });
  });

  it('should change sort type in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, sortChangeType(sortingType.type.price)))
      .toEqual({
        activeSort: {
          type: sortingType.type.price,
          order: sortingType.order.default,
        },
        minPrice: '',
        maxPrice: '',
        typeGuitar: [],
        activeStrings: [],
        activePage: 1,
        activeSearch: '',
        isActivePopupAddCart: false,
        isActivePopupAddCartSuccess: false,
        isActivePopupDeleteGuitarCart: false,
        promoCod: '',
      });
  });

  it('should change min price in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, minPriceChange('2000')))
      .toEqual({
        activeSort: {
          type: sortingType.type.default,
          order: sortingType.order.default,
        },
        minPrice: '2000',
        maxPrice: '',
        typeGuitar: [],
        activeStrings: [],
        activePage: 1,
        activeSearch: '',
        isActivePopupAddCart: false,
        isActivePopupAddCartSuccess: false,
        isActivePopupDeleteGuitarCart: false,
        promoCod: '',
      });
  });

  it('should change max price in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, maxPriceChange('25000')))
      .toEqual({
        activeSort: {
          type: sortingType.type.default,
          order: sortingType.order.default,
        },
        minPrice: '',
        maxPrice: '25000',
        typeGuitar: [],
        activeStrings: [],
        activePage: 1,
        activeSearch: '',
        isActivePopupAddCart: false,
        isActivePopupAddCartSuccess: false,
        isActivePopupDeleteGuitarCart: false,
        promoCod: '',
      });
  });

  it('should change type guitars in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, typeGuitarChange([guitarsType.acoustic])))
      .toEqual({
        activeSort: {
          type: sortingType.type.default,
          order: sortingType.order.default,
        },
        minPrice: '',
        maxPrice: '',
        typeGuitar: [guitarsType.acoustic],
        activeStrings: [],
        activePage: 1,
        activeSearch: '',
        isActivePopupAddCart: false,
        isActivePopupAddCartSuccess: false,
        isActivePopupDeleteGuitarCart: false,
        promoCod: '',
      });
  });

  it('should change active number strings in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, numberOfStringChange(['4'])))
      .toEqual({
        activeSort: {
          type: sortingType.type.default,
          order: sortingType.order.default,
        },
        minPrice: '',
        maxPrice: '',
        typeGuitar: [],
        activeStrings: ['4'],
        activePage: 1,
        activeSearch: '',
        isActivePopupAddCart: false,
        isActivePopupAddCartSuccess: false,
        isActivePopupDeleteGuitarCart: false,
        promoCod: '',
      });
  });

  it('should change page in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, activePageChange(2)))
      .toEqual({
        activeSort: {
          type: sortingType.type.default,
          order: sortingType.order.default,
        },
        minPrice: '',
        maxPrice: '',
        typeGuitar: [],
        activeStrings: [],
        activePage: 2,
        activeSearch: '',
        isActivePopupAddCart: false,
        isActivePopupAddCartSuccess: false,
        isActivePopupDeleteGuitarCart: false,
        promoCod: '',
      });
  });

  it('should change isActivePopupAddCart in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, isActivePopupAddCartChange(true)))
      .toEqual({
        activeSort: {
          type: sortingType.type.default,
          order: sortingType.order.default,
        },
        minPrice: '',
        maxPrice: '',
        typeGuitar: [],
        activeStrings: [],
        activePage: 1,
        activeSearch: '',
        isActivePopupAddCart: true,
        isActivePopupAddCartSuccess: false,
        isActivePopupDeleteGuitarCart: false,
        promoCod: '',
      });
  });

  it('should change isActivePopupAddCartSuccess in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, isActivePopupAddCartSuccessChange(true)))
      .toEqual({
        activeSort: {
          type: sortingType.type.default,
          order: sortingType.order.default,
        },
        minPrice: '',
        maxPrice: '',
        typeGuitar: [],
        activeStrings: [],
        activePage: 1,
        activeSearch: '',
        isActivePopupAddCart: false,
        isActivePopupAddCartSuccess: true,
        isActivePopupDeleteGuitarCart: false,
        promoCod: '',
      });
  });

  it('should change isActivePopupDeleteGuitarCart in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, isActivePopupDeleteGuitarCartChange(true)))
      .toEqual({
        activeSort: {
          type: sortingType.type.default,
          order: sortingType.order.default,
        },
        minPrice: '',
        maxPrice: '',
        typeGuitar: [],
        activeStrings: [],
        activePage: 1,
        activeSearch: '',
        isActivePopupAddCart: false,
        isActivePopupAddCartSuccess: false,
        isActivePopupDeleteGuitarCart: true,
        promoCod: '',
      });
  });

  it('should change promoCod in state', () => {
    const state: UiState = {
      activeSort: {
        type: sortingType.type.default,
        order: sortingType.order.default,
      },
      minPrice: '',
      maxPrice: '',
      typeGuitar: [],
      activeStrings: [],
      activePage: 1,
      activeSearch: '',
      isActivePopupAddCart: false,
      isActivePopupAddCartSuccess: false,
      isActivePopupDeleteGuitarCart: false,
      promoCod: '',
    };
    expect(uiState(state, promoCodAdding('aaa')))
      .toEqual({
        activeSort: {
          type: sortingType.type.default,
          order: sortingType.order.default,
        },
        minPrice: '',
        maxPrice: '',
        typeGuitar: [],
        activeStrings: [],
        activePage: 1,
        activeSearch: '',
        isActivePopupAddCart: false,
        isActivePopupAddCartSuccess: false,
        isActivePopupDeleteGuitarCart: false,
        promoCod: 'aaa',
      });
  });
});
