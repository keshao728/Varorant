import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { editTicketThunk } from '../../../store/ticket';
import close from '../../Navigation/NavImages/close.png'

import './EditTicketForm.css'

const EditTicketForm = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const ticket = useSelector((state) => state.ticket);
  const myTicket = ticket[ticketId]

  const [subject, setSubject] = useState(myTicket.subject);
  const [description, setDescription] = useState(myTicket.description);
  const [status, setStatus] = useState(false);

  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState([]);


  const validate = () => {
    let err = []
    if (subject.length > 15) err.subject = 'Subject must be less than 15 characters'
    if (!subject || subject.length < 3) err.subject = 'Subject must be at least 3 characters'
    if (description.length > 100) err.description = 'Description must be less than 100 characters'
    if (!description || description.length < 10) err.description = 'Description must be at least 10 characters'

    setErrors(err)


    if (err.length) setShowErrors(true)

    return err
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)

    if (!errors.length) {
      setErrors([])
      setShowErrors(false)

      let validationErrors = validate()
      if (validationErrors?.length) return


      if (!errors.length) {
        const updatedTicket = {
          user_id: sessionUser.id,
          subject: subject,
          description: description,
          status: status ? "Solved" : "Open"
          // status: status ? !status : status
        }
        let createdTicket = await dispatch(editTicketThunk(ticketId, updatedTicket)).catch(async res => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors)
          }
        })

        if (createdTicket) {
          setShowErrors(false)
          // setModalOpen(false)
          // history.push(`/tickets/${createdTicket.id}`)
          // return (() => dispatch(resetData()))
        }
      }
      setModalOpen(false)
      return errors
    }
  }

  useEffect(async () => {
    if (showErrors) validate()
  }, [setErrors, subject, description])

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
              {!!errors.subject &&
                <div className="ticket-error">
                  <img className="caution" src="https://imgur.com/E1p7Fvo.png" />
                  {errors.subject}
                </div>
              }
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
                required
                onChange={(e) => setDescription(e.target.value)} />
              {!!errors.description &&
                <div className='ticket-error'>
                  <img className="caution" src="https://imgur.com/E1p7Fvo.png" />
                  {errors.description}
                </div>
              }
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
                  required
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
