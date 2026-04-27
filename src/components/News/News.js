import './News.css';
import NewsCard from '../NewsCard/NewsCard';

function News(props) {
  let newsArray = props.searchResult;
  let maxIndex =  props.newsIndex;
  return (
    <section className='news'>
      <div className='news__container'>
      {props.location.pathname === '/' && <h2 className='news__title'>Search results</h2>}
      <ul className='news__elements'>
        { /*Add condition to iterate over saved arrays for saved-news route */
           newsArray.map((news, index) => {
            if(index <= (maxIndex - 1)){
              return <NewsCard
                isLoggedIn={props.isLoggedIn}
                newInfo={news}
                location={props.location}
                savedArticles={props.savedArticles}
                onSave={props.onSave}
                onDelete={props.onDelete}
                key={news.url || index}/>;
            } return '';
          })
        }
      </ul>
      {props.location.pathname === '/' && <button className='news__button' onClick={props.showMore}>Show more</button>}
      </div>
    </section>
  );
}

export default News;
