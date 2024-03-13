export interface fieldAddress {
  duong: string;
  phuong: string;
  quan: string;
  _id: string;
}

export interface Field {
  _id: string;
  fieldName: string;
  fieldAddress: fieldAddress;
  ownerPhoneNumber: string;
  rating: any;
  sport: any;
}
