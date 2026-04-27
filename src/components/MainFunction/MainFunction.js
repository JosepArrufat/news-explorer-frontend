import './MainFunction.css';
import Header from '../Header/Header';
import NewsFinder from '../NewsFinder/NewsFinder';
import SavedNewsInfo from '../SavedNewsInfo/SavedNewsInfo';


function MainFunction({ isLoggedIn,  openLogPopup, location, searchNews, loggOut, username, currentUser, savedArticles}){
    return (
      <section className= {`main-function ${location === '/saved-news' ? 'main-function_saved-news' : ''}`}>
        <Header isLoggedIn={isLoggedIn}  openLogPopup={openLogPopup} location={location}loggOut={loggOut} username={username}/>
        {
          location === '/saved-news'?
          <SavedNewsInfo currentUser={currentUser} savedArticles={savedArticles} />
           : 
          <NewsFinder location={location} searchNews={searchNews}/> //h h2 and searchbar
        } 
      </section>
    );
}

export default MainFunction;
