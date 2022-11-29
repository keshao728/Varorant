import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { createMediaThunk } from '../../store/media';
import close from '../Navigation/NavImages/close.png'

import './MediaForm.css'

const MediaForm = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [attachment, setAttachment] = useState('');

  const sessionUser = useSelector(state => state.session.user);


  const handleSubmit = async (e) => {
    e.preventDefault()
    // setShowErrors(true)
    setModalOpen(false)
    // if (!validationErrors.length) {
    const newMedia = {
      user_id: sessionUser.id,
      title: title,
      attachment: attachment
    }
    // let createdTicket = await dispatch(createTicketThunk(newTicket))
    await dispatch(createMediaThunk(newMedia))
    // if (createdTicket) {
    //   // setShowErrors(false)
    //   history.push(`/tickets/${createdTicket.id}`)
    //   return (() => dispatch(resetData()))
    // }
    // // }
  }

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
            </div>

            <button className="button-media" type="submit"> SUBMIT </button>
          </div>
        </form>
      </div >
    </div >
  )
}
export default MediaForm
