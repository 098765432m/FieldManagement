import { fieldAddress } from "@/types/interfaces/field";
import fieldServices from "@/services/field.services";

//return full address type String from field information.
export function getFullAddress(fieldAddress: fieldAddress): string {
  return `${fieldAddress.duong} ${fieldAddress.phuong} ${fieldAddress.quan} Can Tho`;
}

export function removeFieldById(fieldId: string) {
  fieldServices.deleteFieldById(fieldId);
}
