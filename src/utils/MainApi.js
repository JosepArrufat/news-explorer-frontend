class MainApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  }

  _authHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }

  register(name, email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._authHeaders(),
    }).then(this._checkResponse);
  }

  getSavedArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      headers: this._authHeaders(),
    }).then(this._checkResponse);
  }

  saveArticle(article) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: this._authHeaders(),
      body: JSON.stringify(article),
    }).then(this._checkResponse);
  }

  deleteArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: this._authHeaders(),
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi(process.env.REACT_APP_API_URL);

export default mainApi;
