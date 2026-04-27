class NewsApi {
    constructor(params) {
      this.baseUrl = params.baseUrl;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    }
  
    searchByKeyword(keyword, date, currentDate) {
      return fetch(
        `${this.baseUrl}/news?q=${encodeURIComponent(keyword)}&from=${date}&to=${currentDate}`,
        {
          method: "GET",
        }
      ).then((res) => this._checkResponse(res));
    }
  }
  
  const newsApi = new NewsApi({
    baseUrl: process.env.REACT_APP_API_URL || "https://news-explorer-backend-ev2z.onrender.com",
  });
  
  export default newsApi;