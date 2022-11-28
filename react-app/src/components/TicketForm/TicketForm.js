import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createTicketThunk } from '../../store/ticket';
import './TicketForm.css';

const TicketForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [request, setRequest] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState('');

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
    console.log("NEW TICKET", newTicket)
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
      <form className='ticket-wrapper' onSubmit={handleSubmit}>
        <div className='ticket-type'>
          <label for="type">CHOOSE A REQUEST TYPE</label>
          <select name="type" id='type' onChange={(e) => setRequest(e.target.value)}>
            <option value="">-</option>
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

      </form>
    </div>
  )
}
export default TicketForm
