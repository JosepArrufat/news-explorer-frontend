class NewsApi {
    constructor(params) {
      this.baseUrl = params.baseUrl;
      this.apiKey = params.apiKey;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    }
  
    searchByKeyword(keyword, date, currentDate) {
      return fetch(
        `${this.baseUrl}/everything?q=${encodeURIComponent(keyword)}&pageSize=100&from=${date}&to=${currentDate}&apiKey=${this.apiKey}`,
        {
          method: "GET",
        }
      ).then((res) => this._checkResponse(res));
    }
  }
  
  const newsApi = new NewsApi({
      baseUrl: "https://newsapi.org/v2",
      apiKey: process.env.REACT_APP_NEWS_API_KEY,
  });
  
  export default newsApi;