import createAPIClient from "./api.service";

class SportService {
  api: any;
  constructor(baseURL = "/api/sports") {
    this.api = createAPIClient(baseURL);
  }

  async getAnSport(sportId: string) {
    return (await this.api.get("/" + sportId)).data;
  }
}

export default new SportService();
