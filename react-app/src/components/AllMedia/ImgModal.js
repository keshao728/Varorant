import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { deleteMediaThunk, getAllMediaThunk } from '../../store/media'


import close from '../Navigation/NavImages/close.png'
import './ImgModal.css'


const ImgModal = ({ clickedImg, setClickedImg, clickRight, clickLeft, imgTitle, imgId }) => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(deleteMediaThunk(imgId))
    await dispatch(getAllMediaThunk())
  }

  useEffect(() => {
    dispatch(getAllMediaThunk())
  }, [dispatch])

  const handleClick = (e) => {
    if (e.target.classList.contains('close-me')) {
      setClickedImg(null);
    }
  }

  return (
    <div className="img-modal-wrapper close-me" onClick={handleClick}>
      <div className='img-modal-content'>
        <img className="clicked-img" src={clickedImg} />
        <div className='img-title-buttons-wrapper'>
          <div className='img-title-buttons'>
            <div onClick={clickLeft} className="modal-left">
              <i class="fa-solid fa-angle-left"></i>
            </div>
            <div onClick={clickRight} className="modal-right">
              <i class="fa-solid fa-angle-right"></i>
            </div>
            <div className='img-modal-img-title'>
              <div><i class="fa-regular fa-image"></i></div>
              <div> {imgTitle}</div>
            </div>
          </div>

          <button onClick={handleSubmit} className='button-delete-media close-me' type='submit'>Delete</button>

        </div>
        <img className="close-img-modal close-me" src={close} onClick={handleClick} />
      </div>
    </div>
  )
}

export default ImgModal;
