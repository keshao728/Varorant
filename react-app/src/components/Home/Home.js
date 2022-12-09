import React, { useRef, useEffect } from 'react';

import homeVid from './HomeAssets/homeVid.mp4'
import PlayFree from '../Navigation/PlayFreeModal';
import varorantW from './HomeAssets/varorantW.png'
import latest1 from './HomeAssets/latest1.png'
import latest2 from './HomeAssets/latest2.png'
import latest3 from './HomeAssets/latest3.png'
import harbor from './HomeAssets/harbor.jpg'
import playbutton from './HomeAssets/playbutton.png'
// import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import wearevalo from './HomeAssets/wearevalo.png'
import "./Home.css"

const Home = () => {
  const ref = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const elementTop = ref.current.offsetTop;
      const elementHeight = ref.current.offsetHeight;
      const elementBottom = elementTop + ref.current.elementHeight;

      ref.current.style.transform = `translateY(${(scrollTop - elementTop) / 16}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  // const sessionUser = useSelector(state => state.session.user);

  // let weValo = document.getElementById("we-are");

  // window.onscroll = function () {
  //   let scrollTop = document.documentElement.scrollTop;
  //   let scrollHeight = document.documentElement.scrollHeight;
  //   let clientHeight = document.documentElement.clientHeight;

  //   let valoY = -(scrollTop - document.getElementById("we-are").offsetHeight) + 100;

  // }

  // let weValoBackground = document.querySelector(".home-latest")

  // document.querySelector(".home-latest").addEventListener('scroll', () => {
  // let windowScroll = document.querySelector(".home-latest").scrollTop;
  // document.getElementById("we-are").style.transform = "translateY(" + windowScroll / 2 + "px)";
  // })

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
      <div className="home-latest" id="home-latest">
        {/* <img className="home-background" src={wearevalo}/> */}
        <div className="home-latest-title">
          THE LATEST
        </div>
        <div className="latest-background-wrap" id="we-are" ref={ref}>
          <div className="latest-background-1">WE ARE </div>
          <div className="latest-background-2">VALORANT</div>
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
      <div className="overview-wrapper">
        <img src={harbor} className="harbor-img" />
        <div className="overview-text">
          <div className="overview-des">EPISODE_5 // ACT III / YR 2</div>
          <div className="overview-title">DIMENSION</div>
          <div className="overview-button-wrap">
            <div className="overview-boader">
              <button
                className="overview-but"
                id="overview-button"
                onClick={() => {
                  window.open('https://playvalorant.com/en-us/news/game-updates/what-s-new-in-valorant-episode-5-act-iii/')
                }}>
                ACT III OVERVIEW
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="we-are-wrapper">
        <div className="we-are-box">
          <div className="we-are-border-top"></div>
          <div>
            <div className="we-are-title">WE ARE VARORANT</div>
          </div>
          <div className="defy-wrapper">
            <div className="defy-left">
              <div className="defy-title">DEFY THE LIMITS</div>
              <div className="defy-des">
                Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive. Take on foes across Competitive and Unranked modes as well as Deathmatch and Spike Rush.
              </div>
              <div className="we-are-button-wrap">
                <div className="we-are-boader">
                  <button
                    className="we-are-but"
                    id="we-are-button"
                    onClick={() => {
                      window.open('https://playvalorant.com/en-us/news/announcements/beginners-guide/')
                    }}>
                    LEARN THE GAME
                  </button>
                </div>
              </div>
            </div>

            <a href="https://www.youtube.com/watch?v=le474A3jBxA&t=3s&ab_channel=VALORANT" className="defy-gif-wrapper" target="_blank" rel="noreferrer">
              <img className="defy-gif" src="https://imgur.com/5DxTAAS.gif" />

              <div className="defy-border">
                <div className="defy-gif-button-wrapper">
                  <img className="defy-gif-button" src={playbutton} />
                  <div className="defy-gif-overlay"> </div>
                </div>
              </div>
            </a>
          </div>
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
