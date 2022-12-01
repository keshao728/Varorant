import homeVid from './HomeAssets/homeVid.mp4'
import PlayFree from '../Navigation/PlayFreeModal';
import varorantW from './HomeAssets/varorantW.png'
import latest1 from './HomeAssets/latest1.png'
import latest2 from './HomeAssets/latest2.png'
import latest3 from './HomeAssets/latest3.png'
// import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  // const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="home-wrapper">
      <div className='video-line'></div>
      <div className='video-line-2'></div>
      <div className='video-line-3'></div>
      <div className='video-wrapper'>
        <div className='video-des'>A 5v5 character-based tactical shooter</div>
        <img className='video-title' src={varorantW} />
        <PlayFree />
        <video className="home-video" src={homeVid} autoPlay muted loop />
      </div>
      <div className="home-latest">
        <div className="home-latest-title">
          THE LATEST
        </div>
        <div className="home-latest-img">
          <a className="latest-links" href="https://letsplay.live/valorantchallengersoceania2023/" target="_blank" rel="noreferrer">

            <div className="latest-img-wrapper">
              <img className="latest-img" src={latest1} />
              <div className="latest-img-overlay"></div>
            </div>

            <div className="latest-date-info">
              <div>11/22/22</div>
              <div className="latest-info">ESPORTS</div>
            </div>

            <div className="latest-title">WELCOME TO VARORANT CHALLENGERS OCEANIA 2023!</div>
          </a>

          <a className="latest-links" href="https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-5-10/" target="_blank" rel="noreferrer">
            <div className="latest-img-wrapper">
              <img className="latest-img" src={latest2} />
              <div className="latest-img-overlay"></div>
            </div>

            <div className="latest-date-info">
              <div>11/15/22</div>
              <div className="latest-info">GAME UPDATES</div>
            </div>
            <div className="latest-title">VARORANT PATCH NOTES 5.10</div>
          </a>

          <a className="latest-links" href="https://valorantesports.com/news/watch-game-changers-championship-earn-drops/" target="_blank" rel="noreferrer">
            <div className="latest-img-wrapper">
              <img className="latest-img" id="latest-img-id" src={latest3} />
              <div className="latest-img-overlay"></div>
            </div>
            <div className="latest-date-info">
              <div>11/14/22</div>
              <div className="latest-info">ESPORTS</div>
            </div>
            <div className="latest-title">WATCH GAME CHANGERS CHAMPIONSHIP. EARN DROPS.</div>
          </a>
        </div>
      </div>
      <div className="footer">
        <div className="proj-directory-wrapper">
          <a className="proj-directory" href="https://github.com/keshao728/Varorant" target="_blank" rel="noreferrer">
            VIEW PROJECT GITHUB
          </a>
        </div>
        <div className="dev-socials">
          <div className="dev-socials-links">
            <a href="https://github.com/keshao728" className="dev-link" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github"></i></a>
          </div>

          <div className="dev-socials-links">
            <a href="https://www.linkedin.com/in/keyingshao/" className="dev-link" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="trademark">
          ©2022 MEOWIT GAMES, INC. VARORANT, AND ANY ASSOCIATED LOGOS ARE TRADEMARKS, SERVICE MARKS, AND/OR REGISTERED TRADEMARKS OF MEOWIT GAMES, INC.
        </div>
      </div>

    </div>
  )
}

export default Home
