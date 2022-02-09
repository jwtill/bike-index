export default class BikeService {
  static async getBikeIndex (city) {
    try {
      const response = await fetch (`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${city}&distance=10&stolenness=stolen`);
      if (!response.ok) {
        throw Error (response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}