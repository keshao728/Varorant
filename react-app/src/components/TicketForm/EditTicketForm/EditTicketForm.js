import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { editTicketThunk } from '../../../store/ticket';
import close from '../../Navigation/NavImages/close.png'

import './EditTicketForm.css'

const EditTicketForm = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const ticket = useSelector((state) => state.ticket);
  const myTicket = ticket[ticketId]

  const [subject, setSubject] = useState(myTicket.subject);
  const [description, setDescription] = useState(myTicket.description);
  const [status, setStatus] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault()
    // setShowErrors(true)
    setModalOpen(false)
    // if (!validationErrors.length) {
    const updatedTicket = {
      user_id: sessionUser.id,
      subject: subject,
      description: description,
      status: status ? "Solved" : "Open"
      // status: status ? !status : status
    }
    // let createdTicket = await dispatch(createTicketThunk(newTicket))
    await dispatch(editTicketThunk(ticketId, updatedTicket))
    // if (createdTicket) {
    //   // setShowErrors(false)
    //   history.push(`/tickets/${createdTicket.id}`)
    //   return (() => dispatch(resetData()))
    // }
    // // }
  }

  return (
    <div className='edit-ticket-mother'>
      <div className='edit-ticket-form-wrapper'>

        <form className='ticket-wrapper' onSubmit={handleSubmit}>
          <img className="ticket-close-edit" src={close} onClick={() => setModalOpen(false)} />
          <div className='edit-ticket-form-title-des'>
            <div className='edit-ticket-form-title'>
              Edit Ticket
            </div>
            <div className='edit-ticket-form-des'>
              From tech to tilt, we're here to help you!
            </div>
          </div>


          <div className='edit-ticket-input-wrapper'>
            <div className='edit-ticket-input-box'>
              <label className="edit-ticket-label">
                SUBJECT
                <i class="fa-solid fa-star-of-life"></i>
              </label>
              <input
                className='ticket-input'
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className='edit-ticket-input-box'>
              <label className="edit-ticket-label">
                DESCRIPTION
                <i class="fa-solid fa-star-of-life"></i>
              </label>
              <textarea
                className='ticket-input'
                type="text"
                id="ticket-des"
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="edit-ticket-radio">
            <div className="edit-ticket-label">
                Status
                <i class="fa-solid fa-star-of-life"></i>
              </div>
              <div className='edit-radio'>
                <input type="radio"
                  name="true"
                  value={false}
                  checked
                  // checked={status === false}
                  onChange={(e) => setStatus(e.target.value)} />
                <label className='radio-label'>Still need help</label>
              </div>
              <div className='edit-radio'>
                <input type="radio"
                  name="true"
                  value={true}
                  // checked={status === true}
                  // checked
                  onChange={(e) => setStatus(e.target.value)} />
                <label className='radio-label'>I got it!</label>
                  {/* <div >
                    <input type="checkbox"
                      value={true}
                      onChange={(e) => setStatus(e.target.value)} />
                    <label for="false">Ticket Solved</label>
                  </div> */}
              </div>
            </div>

            <button className="button-edit-ticket" type="submit"> SUBMIT </button>
          </div>
        </form>
      </div >
    </div >
  )
}
export default EditTicketForm
