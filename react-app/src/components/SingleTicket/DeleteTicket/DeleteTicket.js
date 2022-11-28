import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { deleteTicketThunk } from '../../../store/ticket';

const DeleteTicket = ({ setModalOpen }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { ticketId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(deleteTicketThunk(ticketId))
    setModalOpen(false)
    history.push('/tickets/my-tickets')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div> Would you like to delete this ticket?</div>

          <button type='submit'>Delete</button>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default DeleteTicket
