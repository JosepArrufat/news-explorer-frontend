import './NewsCard.css';
import saveBlue from '../../images/news__save/save-blue.svg';
import saveWhite from '../../images/news__save/save-white.svg';

function NewsCard({ newInfo, location, isLoggedIn, savedArticles, onSave, onDelete }) {
  const articleLink = newInfo.url || newInfo.link || '';
  const articleImage = newInfo.urlToImage || newInfo.image || '';
  const articleTitle = newInfo.title || '';
  const articleDescriptionSource = newInfo.description || newInfo.text || '';
  const articleDateSource = newInfo.publishedAt || newInfo.date || '';
  const articleSource = typeof newInfo.source === 'string'
    ? newInfo.source
    : newInfo.source?.name || '';
  const descriptionString = articleDescriptionSource;
    const description = descriptionString ? descriptionString.replace(/((<ul>|<ol>)|<li>|<\/li>|(<\/ul>|<\/ol>))/g, '') : '';
  const dateString = articleDateSource;
    const date = dateString ? dateString.slice(0, 10) : '';
    const displayedDate = new Date(date);
    const testDate = displayedDate.toLocaleDateString("default", {
        year: "numeric",
        day: "numeric",
        month: "long",
    });

  const savedArticle = savedArticles && savedArticles.find((a) => (a.link || a.url) === articleLink);
    const isSaved = Boolean(savedArticle);

    const handleSave = () => {
        if (!isLoggedIn) return;
        if (isSaved) {
            onDelete(savedArticle._id);
        } else {
            onSave(newInfo);
        }
    };

  return (
    <li className='news__element'>
      <a className='news__link' href={articleLink} target="_blank" rel="noreferrer">
        <img
          src={articleImage}
          alt='article'
          className='news__picture'
        ></img>
        <div className='news__description'>
          <h4 className='news__date'>{testDate}</h4>
          <h3 className='news__headline'>{articleTitle}</h3>
          <p className='news__preview'>{description}</p>
          <h4 className='news__source'>{articleSource}</h4>
        </div>
      </a>
      {location.pathname === "/saved-news" ? (
           <button className='news__delete' onClick={() => savedArticle && onDelete(savedArticle._id)}></button>
        ) : (
            <button className='news__save' onClick={handleSave} style={{backgroundImage: `url(${isSaved ? saveBlue : saveWhite})`}}></button>
        )}
          {location.pathname === "/saved-news" ? (
           <p className='news__save-text'>Remove from Saved</p>
        ) : !isLoggedIn ? (
            <p className='news__save-text'>Sign in to save articles</p>
        )}
        {location.pathname === "/saved-news" ? (
            <p className='news__save-tag'>{articleSource}</p>
        ) : ''}
        
    </li>
  );
}

export default NewsCard;
