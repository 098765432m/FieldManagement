import { loginData } from "@/types/interfaces/auth";
import createAPIClient from "./api.service";

class FieldOwnerService {
  api: any;
  constructor(baseURL = "/api/owners") {
    this.api = createAPIClient(baseURL);
  }

  async getAllOwners() {
    return (await this.api.get("/")).data;
  }

  async getAnOwner(id: string) {
    return (await this.api.get("/" + id)).data;
  }

  async addAnOwner(owner: any) {
    return (await this.api.post("/", owner)).data;
  }

  async deleteAnOwners(id: string) {
    return (await this.api.delete("/" + id)).data;
  }

  async checkAuth(user: any) {
    return (await this.api.post("/checkAuth", user)).data;
  }
}

export default new FieldOwnerService();
