import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { createMediaThunk } from '../../store/media';
import close from '../Navigation/NavImages/close.png'

import './MediaForm.css'

const MediaForm = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [attachment, setAttachment] = useState('');

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const sessionUser = useSelector(state => state.session.user);


  const validate = () => {
    let err = {}
    if (title.length > 15) err.title = 'Title must be less than 15 characters'
    if (title.length < 3) err.title = 'Title must be at least 3 characters'

    if (!attachment.match(/\.(jpg|jpeg|png|gif)$/)) err.attachment = "Please enter a valid URL ending with jpg, jpeg, png or gif"

    setErrors(err)
    if (err.length) setShowErrors(true)
    return err
  }

  // console.log("MEDIA ERRORS", errors)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let validationErrors = validate()
    if (Object.values(validationErrors).length > 0) {
      setShowErrors(true)
      return
    }


    if (!Object.values(validationErrors).length) {
      const newMedia = {
        user_id: sessionUser.id,
        title: title,
        attachment: attachment,
      }

      await dispatch(createMediaThunk(newMedia))

      setShowErrors(false)
      setModalOpen(false)

      return errors
    }
  }

  useEffect(async () => {
    if (showErrors) validate()
  }, [setErrors, title, attachment])



  return (
    <div className='media-mother'>
      <div className='media-form-wrapper'>
        <form className='media-wrapper' onSubmit={handleSubmit}>
          <img className="media-close-edit" src={close} onClick={() => setModalOpen(false)} />
          <div className='media-form-title-des'>
            <div className='media-form-title'>
              Post A Media
            </div>
            <div className='media-form-des'>
              Showcase your artwork!
            </div>
          </div>


          <div className='media-input-wrapper'>
            <div className='media-input-box'>
              <label className="media-label">
                TITLE
                <i class="fa-solid fa-star-of-life"></i>
              </label>
              <input
                className='media-input'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
              {!!errors.title &&
                <div className="ticket-error">
                  <img className="caution" src="https://imgur.com/E1p7Fvo.png" />
                  {errors.title}
                </div>
              }
            </div>
            <div className='media-input-box'>
              <label className="media-label">
                ATTACHMENT
                <i class="fa-solid fa-star-of-life"></i>
              </label>
              <textarea
                className='media-input'
                type="text"
                id="media-des"
                value={attachment}
                onChange={(e) => setAttachment(e.target.value)} />
              {!!errors.attachment &&
                <div className="ticket-error">
                  <img className="caution" src="https://imgur.com/E1p7Fvo.png" />
                  {errors.attachment}
                </div>
              }
            </div>

            <button className="button-media" type="submit"> SUBMIT </button>
          </div>
        </form>
      </div >
    </div >
  )
}
export default MediaForm
