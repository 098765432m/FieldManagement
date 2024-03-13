export const sports = {
  soccer: { name: "Bóng đá", id: "65af8051b08f6fbff6b02c72" },
  volleyball: { name: "Bóng chuyền", id: "65af8059b08f6fbff6b02c74" },
  tennis: { name: "Quần vợt", id: "65af8061b08f6fbff6b02c76" },
  badminton: { name: "Cầu lông", id: "65af807cb08f6fbff6b02c78" },
  basketball: { name: "Bóng rổ", id: "65b0cd8632d1a59c9d7f5e33" },
};

export interface formSport {
  fieldName: string;
  duong: string;
  phoneNumber: string;
  phuong: string;
  quan: string;
  sport: string;
  email: string;
}
