import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { createTicketThunk } from '../../store/ticket';
import varorantW from '../Home/HomeAssets/varorantW.png'
// import ticketBanner from './TicketImages/ticketBanner.jpg'
import './TicketForm.css';

const TicketForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [request, setRequest] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState('');
  const [showForm, setShowForm] = useState(false);

  const openForm = (e) => {
    setRequest(e.target.value)
    const moreForm = document.getElementById('type');

    if (moreForm.value === "1") {
      setShowForm(false);
    } else {
      setShowForm(true);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setShowErrors(true)

    // if (!validationErrors.length) {
    const newTicket = {
      request_type: request,
      subject: subject,
      description: description,
      attachments: attachments,
      user_id: sessionUser.id
    }
    // let createdTicket = await dispatch(createTicketThunk(newTicket))
    await dispatch(createTicketThunk(newTicket))
    // if (createdTicket) {
    //   // setShowErrors(false)
    //   history.push(`/tickets/${createdTicket.id}`)
    //   return (() => dispatch(resetData()))
    // }
    // // }
  }

  return (
    <div className='ticket-mother'>
      <div className='ticket-top-wrapper'>
        <img className='ticket-title' src={varorantW} />
      </div>

      <div className='ticket-support-wrapper'>
        <NavLink to='/support' exact={true} className="ticket-support" activeClassName='active'>
          VALORANT Support
        </NavLink>
        <div className="ticket-support">
          >
        </div>
        <div>
          Submit a request
        </div>
      </div>

      <div className='ticket-form-wrapper'>
        <form className='ticket-wrapper' onSubmit={handleSubmit}>
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
          <div className='ticket-input-box'>
            <label for="type">CHOOSE A REQUEST TYPE</label>
            <select name="type" id='type' onChange={openForm}>
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

          {showForm && (
            <div>
              <div className='ticket-input-box'>
                <label>
                  SUBJECT
                  <i class="fa-solid fa-star-of-life"></i>
                </label>
                <input
                  className='ticket-input'
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div className='ticket-input-box'>
                <label>
                  DESCRIPTION
                  <i class="fa-solid fa-star-of-life"></i>
                </label>
                <textarea
                  className='ticket-input'
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className='ticket-input-box'>
                <label>
                  ATTACHMENTS
                </label>
                <input
                  className='ticket-input'
                  type="text"
                  value={attachments}
                  onChange={(e) => setAttachments(e.target.value)} />
              </div>
              <button className="button-create-ticket" type="submit"> Submit </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
export default TicketForm
