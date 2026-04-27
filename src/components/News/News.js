import './News.css';
import NewsCard from '../NewsCard/NewsCard';

function News(props) {
  const newsArray = props.searchResult;
  const maxIndex = props.newsIndex;
  return (
    <section className='news'>
      <div className='news__container'>
      {props.location.pathname === '/' && <h2 className='news__title'>Search results</h2>}
      <ul className='news__elements'>
        {newsArray.slice(0, maxIndex).map((news, index) => (
          <NewsCard
            key={news.url || `${news.title}-${index}`}
            isLoggedIn={props.isLoggedIn}
            newInfo={news}
            location={props.location}
            savedArticles={props.savedArticles}
            onSave={props.onSave}
            onDelete={props.onDelete}
          />
        ))}
      </ul>
      {props.location.pathname === '/' && <button className='news__button' onClick={props.showMore}>Show more</button>}
      </div>
    </section>
  );
}

export default News;
