import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { getAllTicketsThunk } from '../../store/ticket';
import varorantW from '../Home/HomeAssets/varorantW.png'
// import ticketBanner from './TicketImages/ticketBanner.jpg'
import './TicketForm.css';

const TicketForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [request, setRequest] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [imageLoading, setImageLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const openForm = (e) => {
    setRequest(e.target.value)
    const moreForm = document.getElementById('type');

    if (moreForm.value === "1") {
      setShowForm(false);
    } else {
      setShowForm(true);
    };
  };

  const validate = () => {
    let err = {}
    if (subject.length > 15) err.subject = 'Subject must be less than 15 characters'
    if (subject.length < 3) err.subject = 'Subject must be at least 3 characters'
    if (description.length > 100) err.description = 'Description must be less than 100 characters'
    if (description.length < 10) err.description = 'Description must be at least 10 characters'
    // if (attachments && !attachments.match(/\.(jpg|jpeg|png|gif)$/)) err.attachments = "Please enter a valid URL ending with jpg, jpeg, png or gif"
    setErrors(err)
    if (Object.values(err).length) {
      setShowErrors(true)
    }
    return err
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   let validationErrors = validate()
  //   if (Object.values(validationErrors).length > 0) {
  //     setShowErrors(true)
  //     return
  //   }

  //   if (!Object.values(validationErrors).length) {
  //     const newTicket = {
  //       request_type: request,
  //       subject: subject,
  //       description: description,
  //       attachments: attachments,
  //       user_id: sessionUser.id
  //     }
  //     let createdTicket = await dispatch(createTicketThunk(newTicket))

  //     setShowErrors(false)
  //     history.push(`/tickets/${createdTicket.id}`)
  //     // return (() => dispatch(resetData()))

  //     return errors
  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault()

    let validationErrors = validate()
    if (Object.values(validationErrors).length > 0) {
      setShowErrors(true)
      return
    }

    if (!Object.values(validationErrors).length) {
      const form = document.getElementById('ticket-form')
      const formData = new FormData(form);
      if (attachments) {
        formData.append("attachments", attachments);
        setImageLoading(true);
      }

      const res = await fetch('/api/tickets/new', {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        await res.json();
        // console.log('res', res)
        await dispatch(getAllTicketsThunk());
        setImageLoading(false);
        history.push("/tickets/my-tickets");
      } else {
        setImageLoading(false);
        // a real app would probably use more advanced
        // error handling
        console.log("error", res);
      }
      setShowErrors(false)

      return errors
    }
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setAttachments(file);
  }




  useEffect(async () => {
    if (showErrors) validate()
  }, [setErrors, subject, description, attachments])

  if (!sessionUser) {
    return <Redirect to="/" />
  }


  return (
    <div className='ticket-mother'>
      <div className='ticket-top-wrapper'>
        <img className='ticket-title' src={varorantW} alt="Banner"/>
      </div>

      <div className='ticket-support-wrapper'>
        <NavLink to='/support' exact={true} className="ticket-support" activeClassName='active'>
          VARORANT Support
        </NavLink>
        <div className="ticket-support">
          {">"}
        </div>
        <div>
          Submit a request
        </div>
      </div>

      <div className='ticket-form-wrapper'>
        <form className='ticket-wrapper' onSubmit={handleSubmit} id="ticket-form">
          <div className='ticket-form-title-des'>
            <div className='ticket-form-title'>
              Submit a request
            </div>
            <div className='ticket-form-des'>
              From tech to tilt, we're here to help you!
            </div>
            <div className='ticket-form-des'>
              Submit a Ticket! So long as it doesn't fall through a portal, we'll get back to you soon.
            </div>
          </div>
          <div className='ticket-form-details'>
            DETAILS
          </div>
          <div className='ticket-input-wrapper-1'>
            <div className='ticket-input-box'>
              <label className="ticket-label" for="request_type">1. CHOOSE A REQUEST TYPE</label>
              <select name="request_type" id='type' className='ticket-input' onChange={openForm}>
                <option value="1">-</option>
                <option value="Discuss Personal Suspension or Restriction">Discuss Personal Suspension or Restriction</option>
                <option value="Recover My Account">Recover My Account</option>
                <option value="In-Game Question/Issue & In-Game Content Refund">In-Game Question/Issue & In-Game Content Refund</option>
                <option value="Techinical Issues: Install, Patch, Lag, or Crashes">Techinical Issues: Install, Patch, Lag, or Crashes</option>
                <option value="Report a Player">Report a Player</option>
                <option value="Account Management, Data Request, or Deletion">Account Management, Data Request, or Deletion</option>
                <option value="Billing Payment and Premium Currency Refunds">Billing Payment and Premium Currency Refunds</option>
                <option value="General Question">General Question</option>
              </select>
            </div>
          </div>

          {showForm && (
            <div className='ticket-input-wrapper-2'>
              <div className='ticket-input-box'>
                <label className="ticket-label">
                  SUBJECT
                  <i class="fa-solid fa-star-of-life"></i>
                </label>
                <input
                  className='ticket-input'
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)} />
                {!!errors.subject &&
                  <div className="ticket-error">
                    <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message"/>
                    {errors.subject}
                  </div>
                }
              </div>
              <div className='ticket-input-box'>
                <label className="ticket-label">
                  DESCRIPTION
                  <i class="fa-solid fa-star-of-life"></i>
                </label>
                <textarea
                  className='ticket-input'
                  type="text"
                  id="ticket-des"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />
                {!!errors.description &&
                  <div className='ticket-error'>
                    <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message" />
                    {errors.description}
                  </div>
                }
              </div>

              <div className='ticket-input-box'>
                <label className="ticket-label">
                  <div className="ticket-label-items">
                    <div>ATTACHMENTS</div>
                    <div className="ticket-input-1">/SELECT IMAGE HERE</div>
                    <input
                      className={!attachments ? "no-show-name" : "ticket-file-name"}
                      type="file"
                      // accept="image/*"
                      onChange={updateImage}
                      id="file-upload"
                      accept="image/png, image/gif, image/jpeg, image/jpg"
                    />
                  </div>
                </label>
                {/* <input
                  className='ticket-input'
                  type="text"
                  value={attachments}
                  onChange={(e) => setAttachments(e.target.value)} /> */}
                {!!errors.attachments &&
                  <div className="ticket-error">
                    <img className="caution" src="https://imgur.com/E1p7Fvo.png" alt="Error Message"/>
                    {errors.attachments}
                  </div>
                }

              </div>
              {(imageLoading) ?
                <div className="button-ticket">
                  <img className="button-ticket-loading" src="https://imgur.com/ktdZebh.gif" alt="Loading"/>
                </div>
                :
                <button className="button-create-ticket" type="submit"> SUBMIT </button>
              }
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
export default TicketForm
