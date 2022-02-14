import { datatype, image, lorem, name } from 'faker';
import { guitarType, numberOfString, sortingType } from '../const';
import { Comment, Guitar } from '../types/guitar';
import { State } from '../types/state';

const getRandomRating = () => (Math.floor(Math.random() * 5) + 1);

export const makeFakeComment = (): Comment => ({
  id: String(datatype.number()),
  userName: name.firstName(),
  advantage: lorem.paragraph(),
  disadvantage: lorem.paragraph(),
  comment: lorem.paragraph(),
  rating: getRandomRating(),
  createAt: lorem.paragraph(),
  guitarId: datatype.number(),
});

export const makeFakeGuitar = (): Guitar => ({
  name: name.firstName(),
  vendorCode: String(datatype.number()),
  type: Object.values(guitarType)[Math.floor(Math.random() * 3) + 1],
  description: lorem.paragraph(),
  previewImg: image.image(),
  stringCount: Number(Object.keys(numberOfString)[Math.floor(Math.random() * 3)]),
  rating: getRandomRating(),
  price: datatype.number(),
  comments: new Array(3).fill(null).map(()=>(makeFakeComment())),
  id: datatype.number(),
});

export const makeFakeStore = (): State => ({
  GUITARS: {
    guitars: new Array(6).fill(null).map(()=>(makeFakeGuitar())),
    guitarsError: false,
    searchGuitars:[],
    comment: null,
    commentLoading: false,
    commentError: false,
    guitarsLoading: false,
    guitar: makeFakeGuitar(),
    guitarError: false,
    guitarLoading: false,
    isPostComment: false,
    totalGuitars: 9,
    cartGuitars:[],
  },
  UI_STATE: {
    activeSort: {
      type: sortingType.type.price,
      order: sortingType.order.increase,
    },
    minPrice: '1700',
    maxPrice: '350000',
    typeGuitar: Object.values(guitarType).slice(1),
    activeStrings: ['4','6','12'],
    activePage: 1,
    activeSearch: '',
    isActivePopupAddCart: false,
    isActivePopupAddCartSuccess: false,
    isActivePopupDeleteGuitarCart: false,
  },
});
