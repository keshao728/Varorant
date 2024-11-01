// src/Maps.js
import React, { useState, useEffect, useRef } from 'react';
import './Maps.css';
import pearl from './img/1.png';
import fracture from './img/2.png';
import breeze from './img/3.png';
import icebox from './img/4.png';
import bind from './img/5.png';
import haven from './img/6.png';
import split from './img/7.png';
import ascent from './img/8.png';
import { FadeIn } from 'react-slide-fade-in'


const imgs = [
  {
    url: pearl,
    title: 'PEARL',
    text: 'Attackers push down into the Defenders on this two-site map set in a vibrant, underwater city...',
  },
  {
    url: fracture,
    title: 'FRACTURE',
    text: 'A top secret research facility split apart by a failed radianite experiment...',
  },
  {
    url: breeze,
    title: 'BREEZE',
    text: "Take in the sights of historic ruins or seaside caves on this tropical paradise...",
  },
  {
    url: icebox,
    title: 'ICEBOX',
    text: 'Your next battleground is a secret Kingdom excavation site overtaken by the arctic...',
  },
  {
    url: bind,
    title: 'BIND',
    text: 'Two sites. No middle. Gotta pick left or right. What’s it going to be then?...',
  },
  {
    url: haven,
    title: 'HAVEN',
    text: 'Beneath a forgotten monastery, a clamour emerges from rival Agents clashing...',
  },
  {
    url: split,
    title: 'SPLIT',
    text: 'If you want to go far, you’ll have to go up. A pair of sites split by an elevated center...',
  },
  {
    url: ascent,
    title: 'ASCENT',
    text: 'An open playground for small wars of position and attrition divide two sites on Ascent...',
  },
];

function Maps() {
  const [index, setIndex] = useState(0);
  const [animatedTitle, setAnimatedTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentOffset, setCurrentOffset] = useState(0);
  const [moveX, setMoveX] = useState(0);

  const slickTrackRef = useRef(null);
  const imgLen = imgs.length;
  const ref = useRef(null);

  // Use refs for mutable variables
  const isKeyDown = useRef(false);
  const currentX = useRef(0);
  const moveWith = useRef(0);
  const minMoveOffset = useRef(0);

  // Update moveWith and currentOffset on window resize or index change
  useEffect(() => {
    const updateDimensions = () => {
      if (slickTrackRef.current) {
        const slideWidth = slickTrackRef.current.offsetWidth / imgLen;
        moveWith.current = slideWidth;
        minMoveOffset.current = slideWidth / 3;
        setCurrentOffset(index * slideWidth);
        changeBoxDomStyle(-index * slideWidth);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [index, imgLen]);

  // Function to change the transform style
  const changeBoxDomStyle = (offset, duration = '0ms') => {
    if (slickTrackRef.current) {
      slickTrackRef.current.style.transform = `translateX(${offset}px)`;
      slickTrackRef.current.style.transitionDuration = duration;
    }
  };

  // Update animated title and description on index change
  useEffect(() => {
    // Update the animated title
    let num = 0;
    const english = 'JHZDZQSE';
    let title_str = '';
    const timer = setInterval(() => {
      title_str =
        imgs[index].title.slice(0, num) + english.slice(num * 2, (num + 1) * 2);
      setAnimatedTitle(title_str);
      num++;
      if (num > imgs[index].title.length) {
        clearInterval(timer);
        setAnimatedTitle(imgs[index].title);
      }
    }, 100);
    // Update description
    setDescription(imgs[index].text);
    return () => clearInterval(timer);
  }, [index]);

  // Event Handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    isKeyDown.current = true;
    currentX.current = e.clientX;
    setMoveX(0);
  };

  const handleMouseMove = (e) => {
    if (isKeyDown.current) {
      const deltaX = e.clientX - currentX.current;
      setMoveX(deltaX);
      const moveOffset = currentOffset - deltaX;
      changeBoxDomStyle(-moveOffset);
    }
    if (cursorVisible) {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = (e) => {
    isKeyDown.current = false;
    keyup();
  };

  const keyup = () => {
    if (Math.abs(moveX) > minMoveOffset.current) {
      if (moveX > 0) {
        // Move back to previous image
        if (index >= 1) {
          setIndex((prevIndex) => prevIndex - 1);
        }
      } else {
        // Move forward to next image
        if (index < imgLen - 1) {
          setIndex((prevIndex) => prevIndex + 1);
        }
      }
    }
    // Snap back to current position
    changeBoxDomStyle(-index * moveWith.current, '300ms');
    setMoveX(0);
  };

  // Handle custom cursor visibility and movement
  const handleMouseEnterTrack = () => {
    setCursorVisible(true);
  };

  const handleMouseLeaveTrack = () => {
    setCursorVisible(false);
    isKeyDown.current = false;
    keyup();
  };

  // Handle dot click
  const handleDotClick = (i) => {
    setIndex(i);
    changeBoxDomStyle(-i * moveWith.current, '300ms');
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window?.pageYOffset;

      if (!ref.current) return;

      const elementTop = ref?.current?.offsetTop;

      ref.current.style.transform = `translateY(${(scrollTop - elementTop) / 20}px)`;


    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [ref]);

  return (
    <div id="___gatsby" className="maps-container">
      <div style={{ outline: 'none' }} tabIndex="-1" id="gatsby-focus-wrapper">
        <section className="section light white-lines mapsCarousel--H7RTJ" data-testid="carousel">
          <div className="backgroundTextStroke--FsHcX hideOnMobile--DMAVs">
          <div className="latest-background-wrap" id="we-are" ref={ref}
        >
          <div className="latest-background-1">WE ARE </div>
          <div className="latest-background-2">VARORANT</div>
        </div>
          </div>
          <div className="sectionWrapper border-left sectionWrapper--OHQG7">

          <div className="fade-title">
            <FadeIn
              from="bottom"
              className="home-latest-title"
              positionOffset={50}
              triggerOffset={0}
              durationInMilliseconds={500}
              delayInMilliseconds={0}>
              <div>
                <div className="we-are-title">MAPS</div>
              </div>
            </FadeIn>
            <div className="defy-decor-box-3"></div>
          </div>

            <div className="carouselContainer">
              <div className="carousel--FMGxS carouselContent" data-testid="carousel:content">
                <div className="slick-slider slick-initialized">
                  <div className="slick-list">
                    <div
                      className="slick-track"
                      ref={slickTrackRef}
                      onMouseDown={handleMouseDown}
                      onMouseEnter={handleMouseEnterTrack}
                      onMouseLeave={handleMouseLeaveTrack}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      style={{
                        width: `${imgLen * 100}%`,
                        transform: `translateX(${-index * moveWith.current}px)`,
                        transitionDuration: '0ms',
                      }}
                    >
                      {imgs.map((img, i) => (
                        <div
                          key={i}
                          className={`slick-slide ${index === i ? 'slick-active' : ''}`}
                          style={{ outline: 'none', width: `${100 / imgLen}%` }}
                        >
                          <div>
                            <div className="imageContainer--rR97L">
                              <span
                                className="image--3SRZV"
                                style={{ backgroundImage: `url(${img.url})` }}
                              ></span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ul style={{ display: 'block' }} className="slick-dots">
                    {imgs.map((img, i) => (
                      <li
                        key={i}
                        data-index={i}
                        className={index === i ? 'slick-active' : ''}
                        onClick={() => handleDotClick(i)}
                      >
                        <button>{i + 1}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Custom Cursor */}
              {cursorVisible && (
                <div
                  className={`customCursor white`}
                  data-direction="horizontal"
                  style={{
                    opacity: cursorVisible ? 1 : 0,
                    left: `${cursorPosition.x}px`,
                    top: `${cursorPosition.y}px`,
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 3,
                    transition: 'opacity .2s ease-out',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Custom Cursor Elements */}
                  <div className="icon--+oAZQ icon--s9eG5 currentColor--ReEom">
                    {/* Place your SVG content here */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92">
                      <path
                        d="m91.5 46-8.7 28.1L60 91.5H31.9L9.2 74.1.5 46l8.7-28.1L31.9.5H60l22.8 17.4L91.5 46z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill="#ece8e1"
                        stroke="black"
                        pathLength="2"
                      ></path>
                    </svg>
                  </div>
                  <div className="arrow--FqMab icon--s9eG5 currentColor--ReEom">
                    {/* Right Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path
                        d="m6.3 3 3.6 3.5m4.5 3.5-8.2 7"
                        fill="none"
                        stroke="black"
                        pathLength="1"
                      ></path>
                    </svg>
                  </div>
                  <div className="arrow--FqMab leftArrow--DHas1 icon--s9eG5 currentColor--ReEom">
                    {/* Left Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path
                        d="m6.3 3 3.6 3.5m4.5 3.5-8.2 7"
                        fill="none"
                        stroke="black"
                        pathLength="1"
                      ></path>
                    </svg>
                  </div>
                </div>
              )}
              <div className="detailWrapper">
                <div className="tileDetails">
                  <span className="topRight"></span>
                  <span className="topLeft"></span>
                  <span className="bottomRight"></span>
                  <span className="bottomLeft"></span>
                  <span className="outerBottomRight">
                    <span className="detailBox"></span>
                  </span>
                </div>
                <span className="detailBox detailBox"></span>
                <div className="content mapsCarouselContent mounted">
                  <h5 className="heading-05 title">
                    <span className="num">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <span data-testid="carousel:item:title">{animatedTitle}</span>
                  </h5>
                  <p
                    className="copy-02 description"
                    data-testid="carousel:item:description"
                    style={{ opacity: 1, height: 'auto' }}
                  >
                    {description}
                  </p>
                  <button
                    className="cta S-HS3 textButton button"
                    data-icon="ArrowRightLong"
                    data-testid="carousel:item:cta-button"
                    style={{ opacity: 1 }}
                  >
                    <p className="heading-06 label">VIEW GALLERY</p>
                    <div className="icon icon--QtDXP icon--s9eG5 currentColor--ReEom">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 15">
                        <path
                          d="M16.2.5 19.9 4m4.6 3.5-8.3 7"
                          fill="none"
                          stroke="#ff4655"
                        ></path>
                        <path
                          fill="none"
                          stroke="#ff4655"
                          strokeMiterlimit="10"
                          d="M16 7.5H0"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Maps;
