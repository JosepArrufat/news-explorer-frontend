const BASE_URL = process.env.REACT_APP_API_URL || 'https://news-explorer-backend-ev2z.onrender.com';

const _checkResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Error: ${res.status}`);
};

const getToken = () => localStorage.getItem('token');

export const register = (email, password, username) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  }).then(_checkResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
};

export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  }).then(_checkResponse);
};

export const getSavedArticles = () => {
  return fetch(`${BASE_URL}/articles`, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  }).then(_checkResponse);
};

export const saveArticle = (article) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(article),
  }).then(_checkResponse);
};

export const deleteArticle = (articleId) => {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` },
  }).then(_checkResponse);
};
