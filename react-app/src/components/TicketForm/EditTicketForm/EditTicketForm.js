import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { editTicketThunk } from '../../../store/ticket';
import varorantW from '../../Home/HomeAssets/varorantW.png'

const EditTicketForm = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
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
    <div className='ticket-mother'>
      <div className='ticket-form-wrapper'>
        <form className='ticket-wrapper' onSubmit={handleSubmit}>
          <div className='ticket-form-title-des'>
            <div className='ticket-form-title'>
              Edit Ticket
            </div>
            <div className='ticket-form-des'>
              From tech to tilt, we're here to help you!
            </div>
            <div className='ticket-form-des'>
              Submit a Ticket! So long as it doesn't fall through a portal, we'll get back to you soon.
            </div>
          </div>


          <div className='ticket-input-wrapper-2'>
            <div className='ticket-input-box'>
              <label className="ticket-label">
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
              <label className="ticket-label">
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
            <div className='ticket-input-box'>
              {/* <div >
                <input type="checkbox"
                  value={true}
                  onChange={(e) => setStatus(e.target.value)} />
                <label for="false">Ticket Solved</label>
              </div> */}
              <div >
                <input type="radio"
                  name="true"
                  value={true}
                  // checked={status === true}
                  // checked
                  onChange={(e) => setStatus(e.target.value)} />
                <label>True</label>
              </div>
              <div >
                <input type="radio"
                  name="true"
                  value={false}
                  // checked={status === false}
                  onChange={(e) => setStatus(e.target.value)} />
                <label>False</label>
              </div>
            </div>

            <button className="button-create-ticket" type="submit"> SUBMIT </button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </div >
    </div >
  )
}
export default EditTicketForm
