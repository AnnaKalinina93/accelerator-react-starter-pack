export type Comment = {
  id: string,
  userName: string,
  advantages: string,
  disadvantages: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
}

export type Guitar = {
    id: number,
    name: string,
    vendorCode: string,
    type: string,
    description: string,
    previewImg: string,
    stringCount: number,
    rating: number,
    price: number,
    comments: Comment[],
  };


export type Sorting = {
  type: string;
  order: string;
};
