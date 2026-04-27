import './App.css';
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import Main from '../Main/Main';
import MainFunction from '../MainFunction/MainFunction';
import AutorAbout from '../AutorAbout/AutorAbout';
import Footer from '../Footer/Footer';
import News from '../News/News';
import NoResults from '../NoResults/NoResults';
import Loader from '../Loader/Loader';
import { useState, useEffect } from 'react';
import Popup from '../Popup/Popup';
import PopupInput from '../PopupInput/PopupInput';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SuccesPopup from '../SuccesPopup/SuccesPopup';

function App() {
  const [ isLogPopupOpen, setLogPopupOpen ] = useState(false);
  const [ isRegisterPopupOpen, setRegisterPopupOpen ] = useState(false);
  const [ isSuccesPopupOpen, setIsSuccesPopupOpen ] = useState(false);
  const [ newsResults, setNewsResults ] = useState([]);
  const [ newsIndex, setNewsIndex ] = useState(4);
  const [ isNewsOpen, setIsNewsOpen] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ articlesFound, setIsArticlesFound ] = useState(true);
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ isEmail, setIsEmail ] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isValid, setIsValid ] = useState(false);
  const [ savedArticles, setSavedArticles ] = useState([]);

  let location = useLocation();
  const currentDate = new Date().toLocaleDateString();
  const previousDate = new Date();
  previousDate.setDate(previousDate.getDate() - 7);

  const handleLoggIn = () => {
    mainApi.login(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        return mainApi.getUser();
      })
      .then((user) => {
        setUsername(user.name);
        setIsLoggedIn(true);
        closeAllPopups();
        return mainApi.getSavedArticles();
      })
      .then((articles) => {
        setSavedArticles(articles);
      })
      .catch((err) => console.error('Login error:', err));
  }

  const handleRegister = () => {
    mainApi.register(username, email, password)
      .then(() => {
        closeAllPopups();
        setIsSuccesPopupOpen(true);
      })
      .catch((err) => console.error('Register error:', err));
  }

  const handleLoggOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    setSavedArticles([]);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getUser()
        .then((user) => {
          setUsername(user.name);
          setIsLoggedIn(true);
          return mainApi.getSavedArticles();
        })
        .then((articles) => {
          setSavedArticles(articles);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);
  
  const searchNews = (topic) => {
    setIsNewsOpen(false);
    setIsArticlesFound(true);
    setIsLoading(true);
    newsApi.searchByKeyword(topic, previousDate, currentDate)
    .then((res) => {
      setNewsIndex(4);
      setNewsResults(res.articles);
      if(res.totalResults !== 0){
        setIsNewsOpen(true); 
      } else{
        setIsArticlesFound(false);  
      }
    })
    .catch((res) =>{
      setIsArticlesFound(false);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const displayedNews = () => {
    setNewsIndex( newsIndex + 4 );
  }

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }
  const handleLogPopupOpen = () =>{
    setEmail('');
    setPassword('');
    setLogPopupOpen(true);
    document.addEventListener('keyup', handleEscClose);
  }
  const handleRegisterPopupOpen = () =>{
    setEmail('');
    setPassword('');
    setRegisterPopupOpen(true);
    document.addEventListener('keyup', handleEscClose);
  }

  const closeAllPopups = () =>{
    setLogPopupOpen(false);
    setRegisterPopupOpen(false);
    setIsSuccesPopupOpen(false);
    document.removeEventListener('keyup', handleEscClose);
  }

  const changePopup = () =>{
    setEmail('');
    setPassword('');
    setUsername('');
    setLogPopupOpen(!isLogPopupOpen);
    setRegisterPopupOpen(!isRegisterPopupOpen);
  }

  const succesToLogin = () =>{
    setEmail('');
    setPassword('');
    setIsSuccesPopupOpen(false);
    setLogPopupOpen(true);
  }
  
  const handleValidityLoggin = () =>{
    if(password !== '' && isEmail !== false){
      setIsValid(true);
    } else{
      setIsValid(false);
    }
  }

  /*Waiting for backend validation*/
  const handleValidityRegister = () =>{
    if(password !== '' && isEmail === true && username !== ''){
      setIsValid(true);
    } else{
      setIsValid(false);
    }
}
  return (
    <Routes>
      <Route exact path='/' element={<div className='App container'>
        <Main>
          <MainFunction 
          searchNews={searchNews} 
          isLoggedIn={isLoggedIn}  
          openLogPopup={handleLogPopupOpen} 
          location={location.pathname}
          loggOut={handleLoggOut}
          username={username}/>
          {
            <>
             {isLoading &&
            <Loader />
            }
            {!articlesFound &&
            <NoResults />
            }
            {isNewsOpen &&  
            <News 
            searchResult={newsResults} 
            newsIndex={newsIndex} 
            showMore={displayedNews}
            location={location}
            isLoggedIn={isLoggedIn}/>
            }
            </>
          }
          <AutorAbout />
        </Main>
        <Footer />
        <Popup name={'Sign up'} 
          isLogPopupOpen={isRegisterPopupOpen} 
          isRegisterPopupOpen={isRegisterPopupOpen}
          openRegisterPopup={handleRegisterPopupOpen}
          closePopups={closeAllPopups}
          changePopup={changePopup}
          changeName={'Sign In'}
          email={email}
          password={password}
          username={username}
          isValid={isValid}
          onSubmit={handleRegister}>
          <PopupInput value={email} handleChange={setEmail} isEmail={setIsEmail} vanilaValidate={handleValidityRegister} name='Sign-up Email' />
          <PopupInput value={password} handleChange={setPassword} vanilaValidate={handleValidityRegister} name='Sign-up Password' />
          <PopupInput value={username} handleChange={setUsername} vanilaValidate={handleValidityRegister} name='Sign-up Username' />
        </Popup>
        <Popup name={'Sign in'} 
          isLogPopupOpen={isLogPopupOpen} 
          isRegisterPopupOpen={isRegisterPopupOpen}
          openRegisterPopup={handleLogPopupOpen}
          closePopups={closeAllPopups}
          changePopup={changePopup}
          changeName={'Sign up'}
          email={email}
          password={password}
          isValid={isValid}
          onSubmit={handleLoggIn}>
          <PopupInput value={email} handleChange={setEmail} isEmail={setIsEmail} vanilaValidate={handleValidityLoggin} name='Sign-in Email' />
          <PopupInput value={password} handleChange={setPassword} vanilaValidate={handleValidityLoggin} name='Sign-in Password' />
        </Popup>
        <SuccesPopup 
          isOpen={isSuccesPopupOpen}
          closePopups={closeAllPopups}
          changePopup={succesToLogin}/>
      </div>} />
      <Route path='/saved-news' element={
        <div className='App container'>
          <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Main>
          <MainFunction 
            searchNews={searchNews} 
            isLoggedIn={isLoggedIn}  
            openLogPopup={handleLogPopupOpen} 
            location={location.pathname}
            loggOut={handleLoggOut}
            username={username}
            isValid={isValid}/>
            {isNewsOpen &&  
            <News 
            searchResult={newsResults} 
            newsIndex={newsIndex} 
            showMore={displayedNews}
            location={location}
            isLoggedIn={isLoggedIn}/>
            }
        </Main>
        <Footer />
        </ProtectedRoute>
        </div>
      }/>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
} 

export default App;
