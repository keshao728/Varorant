import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {  getAllMediaThunk } from '../../store/media';
import close from '../Navigation/NavImages/close.png'
import { useNavigate } from "react-router-dom";


import './MediaForm.css'

const MediaForm = ({ setModalOpen }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [attachment, setAttachment] = useState('');

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const validate = () => {
    let err = {}
    if (title.length > 20) err.title = 'Title must be less than 20 characters'
    if (title.length < 3) err.title = 'Title must be at least 3 characters'
    if (!attachment) err.attachment = 'Please enter a valid URL ending with jpg, jpeg, png or gif'

    setErrors(err)
    if (err.length) setShowErrors(true)
    return err
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    let validationErrors = validate()
    if (Object.values(validationErrors).length > 0) {
      setShowErrors(true)
      return
    }


    if (!Object.values(validationErrors).length) {
      const form = document.getElementById('media-form');

      const formData = new FormData(form);
      formData.append("attachment", attachment);

      setImageLoading(true);

      const res = await fetch('/api/media/new', {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        await res.json();
        await dispatch(getAllMediaThunk());
        setImageLoading(false);
        setShowErrors(false)
        setModalOpen(false)
        navigate("/media");
      }
      else {
        setImageLoading(false);
        console.log("error", res);
      }
      await dispatch(getAllMediaThunk());



      return errors
    }
  }
  const updateImage = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  }



  useEffect(() => {
    if (showErrors) validate()
  }, [setErrors, title, attachment])



  return (
    <div className='media-mother'>
      <div className='media-form-wrapper'>
        <form className='media-wrapper' onSubmit={handleSubmit} id="media-form">
          <div className="media-close-edit">
            <img src={close} className="media-close-edit-img" alt="Cancel" onClick={() => setModalOpen(false)} />
          </div>
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
                <div className="media-label-title">
                  TITLE
                  <i className="fa-solid fa-star-of-life"></i>
                </div>
              </label>
              <input
                className='media-input'
                type="text"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)} />
              {!!errors.title &&
                <div className="ticket-error">
                  <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                  {errors.title}
                </div>
              }
            </div>
            <div className='media-input-box'>
              <label className="media-label">
                <div className="media-label-title">
                  ATTACHMENT
                  <i className="fa-solid fa-star-of-life"></i>
                </div>
                {/* <textarea
                className='media-input'
                type="text"
                id="media-des"
                value={attachment}
              onChange={(e) => setAttachment(e.target.value)} /> */}
                <div className="media-input-1">/SELECT IMAGE HERE</div>
                <input
                  className={!attachment ? "no-show-name" : "media-file-name"}
                  type="file"
                  // accept="image/*"
                  accept="image/png, image/gif, image/jpeg, image/jpg"
                  onChange={updateImage}
                  id="file-upload"
                  // style={{ width:"227px", height:"245px" }}
                />
              </label>
              {!!errors.attachment &&
                <div className="ticket-error" >
                  <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                  {errors.attachment}
                </div>
              }
            </div>

            {(imageLoading) ?
              <div className="button-media">
                <img className="button-media-loading" src="https://imgur.com/ktdZebh.gif" alt="Loading" />
              </div>
              :
              <button className="button-media" type="submit"> SUBMIT </button>
            }
          </div>
        </form>
      </div >
    </div >
  )
}
export default MediaForm
