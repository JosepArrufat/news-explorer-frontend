import './AutorAbout.css';
import autorPhoto from '../../images/autor-photo/author-photo.png'

function AutorAbout(){
    return(
        <section className='about'>
            <div className='about__container'>
            <img src={autorPhoto} alt='author' className='autor__photo'></img>
            <div className='autor-description'>
                <h1 className='autor-description__title'>
                    About the author
                </h1>
                <p className='autor-description__info'>
                    Im Josep Arrufat, student of Practicum. Currently working in the hospitality 
                    business as i look to achieve my dream to become a full-stack developer, being
                    able to create my own projects and aply all the experience i have.
                </p>
            </div>
        </div>
        </section>
    )
}

export default AutorAbout;