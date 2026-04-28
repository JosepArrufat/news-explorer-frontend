import './SavedNewsInfo.css';

function SavedNewsInfo({ currentUser, savedArticles }) {
  const articles = Array.isArray(savedArticles) ? savedArticles : [];
  const keywords = [...new Set(articles.map((a) => a.keyword).filter(Boolean))];
  const displayedKeywords = keywords.slice(0, 3).join(', ');
  const extra = keywords.length > 3 ? `, and ${keywords.length - 3} other${keywords.length - 3 > 1 ? 's' : ''}` : '';
  const username = currentUser ? currentUser.username : 'User';

  return (
    <div className='saved-news'>
      <div className='saved-news__content'>
        <p className='saved-news__title'>Saved articles</p>
        <h1 className='saved-news__info'>{username}, you have saved {articles.length} articles</h1>
        <h2 className='saved-news__subtitle'>
          {displayedKeywords}{extra}
        </h2>
      </div>
    </div>
  );
}

export default SavedNewsInfo;
