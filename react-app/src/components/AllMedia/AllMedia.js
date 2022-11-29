import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import MediaFormModal from "../MediaForm/MediaFormModal";
import ImgModal from "./ImgModal";

import { getAllMediaThunk } from '../../store/media';

import './AllMedia.css'


const AllMedia = () => {
  const dispatch = useDispatch();
  const allMedia = useSelector((state) => state.media);
  const allMediaArr = Object.values(allMedia);
  const sessionUser = useSelector(state => state.session.user);


  const [isLoaded, setIsLoaded] = useState(false)

  const [clickedImg, setClickedImg] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [imgTitle, setImgTitle] = useState(null)
  const [imgId, setImgId] = useState(null)

  const clickRight = () => {
    const mediaLength = allMediaArr.length;
    if (currentIndex + 1 >= mediaLength) {
      setCurrentIndex(0);
      const newUrl = allMediaArr[0].attachment;
      setClickedImg(newUrl);
      setImgTitle(allMediaArr[0].title)
      setImgId(allMediaArr[0].id)
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = allMediaArr.filter((item) => {
      return allMediaArr.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0].attachment;
    const newTitle = newUrl[0].title;
    const newId = newUrl[0].id;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
    setImgTitle(newTitle);
    setImgId(newId);
  }

  const clickLeft = () => {
    const mediaLength = allMediaArr.length;
    if (currentIndex === 0) {
      setCurrentIndex(mediaLength - 1);
      const newUrl = allMediaArr[mediaLength - 1].attachment;
      setClickedImg(newUrl);
      setImgTitle(allMediaArr[mediaLength - 1].title)
      setImgId(allMediaArr[mediaLength - 1].id)
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = allMediaArr.filter((item) => {
      return allMediaArr.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0].attachment;
    const newTitle = newUrl[0].title;
    const newId = newUrl[0].id;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
    setImgTitle(newTitle);
    setImgId(newId);
  }


  useEffect(() => {
    dispatch(getAllMediaThunk())
      .then(() => setIsLoaded(true))

  }, [dispatch])

  // const handleClick = (media, index) => {
  //   setCurrentIndex(index)
  //   setClickedImg(media.attachment)
  // }

  return isLoaded && (
    <div className="all-media-wrapper">
      <div className="media-top-red"></div>
      <div className="media-top-div">
        <div className="media-top-text">
          <div className="media-top-text-red"></div>
          <div className="media-top-title">
            MEDIA
          </div>
          <div className="media-top-des">
            Our work is your play. Whether you're press, a content creator or something in between, if you see it here it's yours to use.
          </div>
          <div className="media-top-des">
            Don’t forget, if you create something with these files, tag @PlayVARORANT on social media. We cannot wait to see what you make.
          </div>
          <div className="media-top-empty">
            <div className="media-top-empty-red"></div>
          </div>
        </div>
        <div>
          <img className="media-top-gif" src="https://imgur.com/EWhTQo2.gif" />
        </div>
      </div>

      <div className="all-media">
        <div className="all-media-links">
          <NavLink className="link-media-all" to='/media' exact={true} activeClassName='active'>
            ALL
          </NavLink>
          {/* maybe add my media later */}
          <div>
            {sessionUser && <MediaFormModal />}
          </div>
        </div>
        <div className="media-form-line"></div>

        <div className="media-map">
          {allMediaArr?.map((media, index) => (
            <div className="media">
              <img className="media-img"
                src={media.attachment}
                onClick={() => {
                  setClickedImg(media.attachment);
                  setCurrentIndex(index)
                  setImgTitle(media.title)
                  setImgId(media.id)
                }}
              />
              <div>
                {media.title}
              </div>
            </div>
          ))}
          <div>
            {clickedImg && (
              <ImgModal
                clickedImg={clickedImg}
                setClickedImg={setClickedImg}
                clickRight={clickRight}
                clickLeft={clickLeft}
                imgTitle={imgTitle}
                imgId={imgId}
              />
            )}
          </div>
        </div>


      </div>
    </div >
  )
}

export default AllMedia;
