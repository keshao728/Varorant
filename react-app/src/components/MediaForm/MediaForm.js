import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { createMediaThunk, getAllMediaThunk } from '../../store/media';
import close from '../Navigation/NavImages/close.png'
import { useHistory } from "react-router-dom";


import './MediaForm.css'

const MediaForm = ({ setModalOpen }) => {
  const history = useHistory(); // so that we can redirect after the image upload is successful

  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [attachment, setAttachment] = useState('');

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);


  const sessionUser = useSelector(state => state.session.user);


  const validate = () => {
    let err = {}
    if (title.length > 20) err.title = 'Title must be less than 20 characters'
    if (title.length < 3) err.title = 'Title must be at least 3 characters'
    if (!attachment) err.attachment = 'Please enter a valid URL ending with jpg, jpeg, png or gif'

    // if (!attachment.match(/\.(jpg|jpeg|png|gif)$/)) err.attachment = "Please enter a valid URL ending with jpg, jpeg, png or gif"

    setErrors(err)
    if (err.length) setShowErrors(true)
    return err
  }

  // console.log("MEDIA ERRORS", errors)


  // const [value, setValue] = useState(0); // integer state
  // const forceUpdate = () => {
  //   return () => setValue(value => value + 1); // update the state to force render
  // }

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
        // forceUpdate()
        await dispatch(getAllMediaThunk());
        setImageLoading(false);
        setShowErrors(false)
        setModalOpen(false)
        history.push("/media");
      }
      else {
        setImageLoading(false);
        // a real app would probably use more advanced
        // error handling
        console.log("error", res);
      }
      await dispatch(getAllMediaThunk());

      // setShowErrors(false)
      // setModalOpen(false)

      return errors
    }
  }
  const updateImage = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   let validationErrors = validate()
  //   if (Object.values(validationErrors).length > 0) {
  //     setShowErrors(true)
  //     return
  //   }


  //   if (!Object.values(validationErrors).length) {
  //     const newMedia = {
  //       user_id: sessionUser.id,
  //       title: title,
  //       attachment: attachment,
  //     }

  //     await dispatch(createMediaThunk(newMedia))

  //     setShowErrors(false)
  //     setModalOpen(false)

  //     return errors
  //   }
  // }

  useEffect(async () => {
    if (showErrors) validate()
  }, [setErrors, title, attachment])

  // function getFileName() {
  //   let fileUpload = document.getElementById('file-upload');
  //   let fileName = document.getElementById('file-name');

  //   fileUpload.addEventListener('change', function () {
  //     if (attachment.length)
  //       fileName.innerText = attachment[0].name;
  //     else
  //       fileName.innerText = '';
  //   });
  // }


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
                  <i class="fa-solid fa-star-of-life"></i>
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
                  <i class="fa-solid fa-star-of-life"></i>
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
