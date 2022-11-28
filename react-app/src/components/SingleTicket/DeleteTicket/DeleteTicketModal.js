import React, { useState } from 'react'
import DeleteTicket from './DeleteTicket'
import { Modal } from '../../../context/Modal'
import './DeleteTicket.css'


const DeleteTicketModal = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <button className='delete-ticket-modal-button' onClick={() => setModalOpen(true)}>Delete</button>
      {modalOpen && (<Modal onClose={() => setModalOpen(false)}>
        <DeleteTicket setModalOpen={setModalOpen} />
      </Modal>)}
    </div>
  )
}

export default DeleteTicketModal
