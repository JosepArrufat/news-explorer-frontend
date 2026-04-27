# News Explorer — Frontend

React frontend for the News Explorer app. Users can search for news articles via keyword, register and log in, and save articles to their personal account.

🔗 **Backend repo:** [news-explorer-backend](https://github.com/JosepArrufat/news-explorer-backend)

---

## Features

- Keyword-based news search powered by the [NewsAPI](https://newsapi.org/)
- User registration and login with JWT authentication
- Save and delete articles from a personal saved news page
- Protected routes — saved news page is only accessible when logged in
- Responsive layout with mobile navigation

---

## Tech Stack

- React 18
- React Router v6
- CSS Modules
- NewsAPI (external)
- REST API communication with the backend

---

## Components

| Component | Description |
|---|---|
| `App` | Root component, manages global state and routing |
| `Header` | Navigation bar with auth state |
| `SearchForm` | Keyword input to trigger news search |
| `NewsCard` | Individual article card with save/delete action |
| `News` | Grid of news cards |
| `SavedNewsInfo` | Summary of saved articles for logged-in user |
| `Popup` | Login and register modal |
| `ProtectedRoute` | Restricts access to authenticated users |
| `Loader` | Loading indicator during API calls |
| `NoResults` | Shown when search returns nothing |
| `MobileNavBar` | Navigation for mobile viewports |
| `Footer` | Site footer |

---

## Getting Started

### Prerequisites

- Node.js 16+
- The backend running locally or deployed — see [news-explorer-backend](https://github.com/JosepArrufat/news-explorer-backend)

### Install and run

```bash
git clone https://github.com/JosepArrufat/news-explorer-frontend.git
cd news-explorer-frontend
npm install
npm start
```

The app runs on `http://localhost:3000` by default.

---

## Environment

Make sure the API base URL in the `utils/` config points to your backend instance (local or deployed).

The frontend now sends news search requests to the backend proxy endpoint, so the NewsAPI key should live only on the backend.
