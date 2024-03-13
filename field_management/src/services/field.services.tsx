import createAPIClient from "./api.service";
import { formSport } from "@/types/interfaces/sport";

class FieldService {
  api: any;
  constructor(baseURL = "/api/fields") {
    this.api = createAPIClient(baseURL);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async getAllBySport(sportId: string) {
    return (await this.api.get("/sports/" + sportId)).data;
  }

  async addField(formDataObject: formSport) {
    console.log(formDataObject);

    return (
      await this.api.post("/", {
        fieldName: formDataObject.fieldName,
        fieldAddress: {
          duong: formDataObject.duong,
          quan: formDataObject.quan,
          phuong: formDataObject.phuong,
        },
        phoneNumber: formDataObject.phoneNumber,
        email: formDataObject.email,
        sport: formDataObject.sport,
      })
    ).data;
  }

  async deleteFieldById(id: string) {
    return await this.api.delete("/find/" + id).data;
  }

  async updateField(id: string, formDataObject: formSport) {
    return await this.api.put("/find/" + id).data;
  }
}

export default new FieldService();
