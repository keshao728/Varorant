import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import close from '../../Navigation/NavImages/close.png'


import { deleteTicketThunk } from '../../../store/ticket';
import './DeleteTicket.css'

const DeleteTicket = ({ setModalOpen }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { ticketId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(deleteTicketThunk(ticketId))
    setModalOpen(false)
    navigate('/tickets/my-tickets')
  }

  return (
    <div className='delete-ticket-wrapper'>
      <form onSubmit={handleSubmit}>
        <div className="ticket-close-delete">
          <img className="ticket-close-delete-img" src={close} alt="Cancel" onClick={() => setModalOpen(false)} />
        </div>
        <div className='delete-ticket'>
          <div className='delete-ticket-title'> Would you like to delete this ticket? </div>
          <button className='button-delete-ticket' type='submit'>Delete</button>
        </div>
      </form>
    </div>
  )
}

export default DeleteTicket
