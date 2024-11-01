import React, { useRef, useEffect } from 'react';

import homeVid from './HomeAssets/homeVid.mp4'
import PlayFree from '../Navigation/PlayFreeModal';
import varorantW from './HomeAssets/varorantW.png'
import latest1 from './HomeAssets/latest1.png'
import latest2 from './HomeAssets/latest2.png'
import latest3 from './HomeAssets/latest3.png'
import harbor from './HomeAssets/harbor.jpg'
import reynaraze from './HomeAssets/reynaraze.gif'
import playbutton from './HomeAssets/playbutton.png'
import map from './HomeAssets/map.png'
import mapleft from './HomeAssets/mapleft.png'
import birds from './HomeAssets/birds.png'
import { FadeIn } from 'react-slide-fade-in'
import defy from './HomeAssets/defy.mp4'
import "./Home.css"

const Home = () => {
  //PARALLAX SCROLL
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const shadowRef = useRef(null);

  useEffect(() => {
    let currentRoot = null;

    try {
      currentRoot = shadowRef?.current?.attachShadow({ mode: 'open' });

      const div = document.createElement('div');
      div.textContent = '';
      currentRoot.appendChild(div);

      const style = document.createElement('style');
      style.textContent = `
        div{
          height: 10px;
          width: 10px;
          position:absolute;
          left: 0px;
          bottom: 200px;
          background-color: #ff4655;
          z-index: 10;
        }
      `;
      currentRoot.appendChild(style);
    }
    catch (e) {
      console.log(e);
    }

    return () => {
      if (currentRoot) {
        while (currentRoot.firstChild) {
          currentRoot.removeChild(currentRoot.firstChild);
        }
      }
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window?.pageYOffset;

      if (!ref.current) return;

      const elementTop = ref?.current?.offsetTop;
      const elementTop2 = ref2?.current?.offsetTop;
      const elementTop3 = ref3?.current?.offsetTop;
      const elementTop4 = ref4?.current?.offsetTop;

      ref.current.style.transform = `translateY(${(scrollTop - elementTop) / 20}px)`;
      ref2.current.style.transform = `translateY(${(scrollTop - elementTop2) / 15}px)`;
      ref3.current.style.transform = `translateY(${-(scrollTop - elementTop3) / 35}px) translateX(${-(scrollTop - elementTop3) / 5}px)`;
      ref4.current.style.transform = `translateY(${-(scrollTop - elementTop4) / 10}px)`;

      let reword_wrapper = document?.getElementById("reword-wrapper");
      let reword_line = document?.getElementById('reword-line')
      let reword_top = document?.getElementById('rewords1')
      let reword_bottom = document?.getElementById('rewords2')

      let scope = (reword_wrapper?.offsetHeight * (100 - 90)) / 100;
      let clientHeight = document?.documentElement.clientHeight;

      let bottomY = reword_wrapper?.getBoundingClientRect().bottom;

      if (reword_line) {
        if (bottomY < -scope || bottomY > clientHeight + scope) {
          reword_top.innerHTML = ''
          reword_bottom.innerHTML = ''
          reword_line.style.width = "0";
          reword_status = true
        } else {
          if (reword_status) {
            let reword_line = document.getElementById('reword-line')
            rewords1()
            setTimeout(rewords2(), top_final.length * 30);
            reword_line.style.width = "100%";
            reword_status = false
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [ref, ref2, ref3, ref4]);

  //REWORD
  let top_final = 'VLRT PR0T0C0L'
  let reword_status = true

  function rewords1() {
    let top_final = 'VLRT PR0T0C0L'
    let runword = 'VLRTPR0T0C0L'
    let top_initial = ''
    let i = 0
    let reword_top = document.getElementById('rewords1')
    let timer = setInterval(() => {
      if (top_initial.length < top_final.length) {
        top_initial += top_final[i++]
        reword_top.innerHTML = top_initial + runword[Math.round(Math.random() * 10)]
      } else {
        clearInterval(timer)
        reword_top.innerHTML = top_initial
      }
    }, 30)
    window.onscroll = null;
  }

  function rewords2() {
    let bottom_final = 'MR0C - SWD - BR4'
    let runword = 'VLRTPR0T0C0L'
    let bottom_initial = ''
    let j = 0
    let reword_bottom = document.getElementById('rewords2')
    let timer1 = setInterval(() => {
      if (bottom_initial.length < bottom_final.length) {
        bottom_initial += bottom_final[j++]
        reword_bottom.innerHTML = bottom_initial + runword[Math.round(Math.random() * 10)]
      } else {
        clearInterval(timer1)
        reword_bottom.innerHTML = bottom_initial
      }
    }, 30)
    window.onscroll = null;
  }

  return (
    <div className="home-wrapper" id="home-wrapper">
      <div className='video-line'></div>
      <div className='video-line-3'></div>
      <div className='video-line-2'></div>
      <div className='video-wrapper'>
        <div className='video-des'>A media/ticket community for 5v5 character-based tactical shooter</div>
        <img className='video-title' src={varorantW} alt="Video Title" />
        <PlayFree />
        <video className="home-video" alt="Home Video" src={homeVid} autoPlay muted loop></video>
      </div>
      <div className="video-triangle"></div>
      <div className="home-latest" id="home-latest">
        <div className="latest-line"></div>
        <div className="fade-title">
          <FadeIn
            from="bottom"
            className="home-latest-title"
            positionOffset={50}
            triggerOffset={200}
            durationInMilliseconds={500}
            delayInMilliseconds={0}>
            <div className="home-latest-title">
              THE LATEST
            </div>
          </FadeIn>
        </div>
        <div className="latest-background-wrap" id="we-are"
        ref={ref}
        >
          <div className="latest-background-1">WE ARE </div>
          <div className="latest-background-2">VARORANT</div>
        </div>
        <div className="latest-dots">
          <div className="latest-dots-1"></div>
          <div className="latest-dots-2"></div>
        </div>
        <div className="home-latest-img">
          <a className="latest-links" href="https://letsplay.live/valorantchallengersoceania2023/" target="_blank" rel="noreferrer">

            <div className="latest-img-wrapper">
              <div className="fade-img">
                <FadeIn
                  from="bottom"
                  className="home-latest-title"
                  positionOffset={50}
                  triggerOffset={200}
                  durationInMilliseconds={500}
                  delayInMilliseconds={100}>
                  <div className="latest-img-overlay"></div>
                  <img className="latest-img" src={latest1} alt="Latest News 1" />
                </FadeIn>
              </div>
            </div>


            <div className="latest-date-info">
              <div>11/22/22</div>
              <div className="latest-info">ESPORTS</div>
            </div>

            <div className="latest-title">WELCOME TO VARORANT CHALLENGERS OCEANIA 2023!</div>
          </a>

          <a className="latest-links" href="https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-5-10/" target="_blank" rel="noreferrer">
            <div className="latest-img-wrapper">
              <div className="fade-img">
                <FadeIn
                  from="bottom"
                  className="home-latest-title"
                  positionOffset={50}
                  triggerOffset={0}
                  durationInMilliseconds={200}
                  delayInMilliseconds={200}>
                  <img className="latest-img" src={latest2} alt="Latest News 2" />
                  <div className="latest-img-overlay"></div>
                </FadeIn>
              </div>
            </div>

            <div className="latest-date-info">
              <div>11/15/22</div>
              <div className="latest-info">GAME UPDATES</div>
            </div>
            <div className="latest-title">VARORANT PATCH NOTES 5.10</div>
          </a>

          <a className="latest-links" href="https://valorantesports.com/news/watch-game-changers-championship-earn-drops/" target="_blank" rel="noreferrer">
            <div className="latest-img-wrapper">
              <div className="fade-img">
                <FadeIn
                  from="bottom"
                  className="home-latest-title"
                  positionOffset={50}
                  triggerOffset={200}
                  delayInMilliseconds={300}
                  durationInMilliseconds={500}>
                  <img className="latest-img" id="latest-img-id" src={latest3} alt="Latest News 3" />
                  <div className="latest-img-overlay"></div>
                </FadeIn>
              </div>
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
        <div className="overview-line">

          <div ref={shadowRef}></div>
        </div>
        <img src={harbor} className="harbor-img" alt="Harbor" />
        <div className="overview-text">
          <div className="overview-des">EPISODE_5 // ACT III / YR 2</div>
          <div className="fade-title">
            <FadeIn
              from="bottom"
              className="home-latest-title"
              positionOffset={50}
              triggerOffset={400}
              durationInMilliseconds={500}
              delayInMilliseconds={0}>
              <div className="overview-title">DIMENSION</div>
            </FadeIn>
          </div>
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

      <div className="we-are-line">
        <div className="defy-decor-box"></div>
        <div className="defy-decor-box-1"></div>
        <div className="defy-decor-box-2"></div>
      </div>
      <div className="we-are-wrapper">
        <div className="we-are-box">
          <div className="we-are-border-top"></div>
          <div className="fade-title">
            <FadeIn
              from="bottom"
              className="home-latest-title"
              positionOffset={50}
              triggerOffset={0}
              durationInMilliseconds={500}
              delayInMilliseconds={0}>
              <div>
                <div className="we-are-title">WE ARE VARORANT</div>
              </div>
            </FadeIn>
            <div className="defy-decor-box-3"></div>
          </div>
          <div className="rebox">
            <div id="reword-wrapper">
              <div id="rewords1"> </div>
              <div id="rewords2"> </div>
              <div id="reword-line"></div>
            </div>
          </div>
          <div className="defy-wrapper">
            <div className="defy-left">
              <div className="defy-title">DEFY THE LIMITS</div>
              <div className="defy-des">
                Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you&apos;ll need to think faster than your opponent if you want to survive. Take on foes across Competitive and Unranked modes as well as Deathmatch and Spike Rush.
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
              <div className="defy-00">00.</div>
            </div>
            <a href="https://www.youtube.com/watch?v=le474A3jBxA&t=3s&ab_channel=VALORANT" className="defy-gif-wrapper" target="_blank" rel="noreferrer">
              <div className="defy-border">
                <div className="defy-dots">
                  <div className="defy-dots-1"></div>
                  <div className="defy-dots-2"></div>
                </div>
                <div className="defy-gameplay">Gameplay</div>
                <video className="defy-gif" preload="true" autoPlay muted loop>
                  <source src={defy} type="video/mp4" alt="Gameplay Video" />
                </video>
                <div className="defy-vid-line"></div>

                <div className="defy-gif-button-wrapper">
                  <img className="defy-gif-button" src={playbutton} alt="Play Video Button" />
                  <div className="defy-gif-overlay"> </div>
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>

      <div className="agent-wrapper">
        <div className="agent-triangle"></div>

        <div className="agent-gif-wrap">
          <img src={reynaraze} ref={ref4} className="agent-gif" alt="Reyna and Raze" />
        </div>
        <div className="agent-line"></div>
        <div className="agent-right">
          <div className="fade-title">
            <FadeIn
              from="bottom"
              className="home-latest-title"
              positionOffset={50}
              triggerOffset={0}
              durationInMilliseconds={500}
              delayInMilliseconds={0}>
              <div className="agent-title">YOUR AGENTS</div>
            </FadeIn>
          </div>
          <div className="agent-title-2">CREATIVITY IS YOUR GREATEST WEAPON.</div>
          <div className="agent-des">More than guns and bullets, you’ll choose an Agent armed with adaptive, swift, and lethal abilities that create opportunities to let your gunplay shine. No two Agents play alike, just as no two highlight reels will look the same.
            <div className="agent-button-wrap">
              <div className="agent-boader">
                <button
                  className="agent-but"
                  id="agent-button"
                  onClick={() => {
                    window.open('https://playvalorant.com/en-us/news/announcements/beginners-guide/')
                  }}>
                  VIEW ALL AGENTS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="left-map-item-wrap">

        <img className="left-map-item" src={mapleft} />
      </div>
        <div className="map-line"></div>
      <div className="map-wrapper">
        <div className="map-background-wrap" id="scrollplace" ref={ref2}>
          <div className="map-background-1">PLACE</div>
        </div>
        <div className="map-left">
          <div className="fade-title">
            <FadeIn
              from="bottom"
              className="home-latest-title"
              positionOffset={50}
              triggerOffset={0}
              durationInMilliseconds={500}
              delayInMilliseconds={0}>
              <div className="map-title" id="slide">YOUR MAPS</div>
            </FadeIn>
          </div>
          <div className="map-title-2">FIGHT AROUND THE WORLD.</div>
          <div className="map-des">Each map is a playground to showcase your creative thinking. Purpose-built for team strategies, spectacular plays, and clutch moments. Make the play others will imitate for years to come.
            <div className="map-button-wrap">
              <div className="map-boader">
                <button
                  className="map-but"
                  id="map-button"
                  onClick={() => {
                    window.open('https://playvalorant.com/en-us/maps/')
                  }}>
                  VIEW ALL MAPS
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src={map} className="map-img" alt="Map" />
          <img src={birds} className="bird-img" ref={ref3} alt="Bird" />
        </div>
      </div>
    </div >
  )
}

export default Home
