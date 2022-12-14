import React, { useState } from 'react'
import EditTicketForm from './EditTicketForm'
import { Modal } from '../../../context/Modal'
import './EditTicketForm.css'

const EditTicketModal = () => {
  const [modalOpen, setModalOpen] = useState(false)



  return (
    <div>
      <button className='edit-ticket-modal-button' onClick={() => setModalOpen(true)}>Edit</button>
      {modalOpen && (<Modal onClose={() => setModalOpen(false)}>
        <EditTicketForm setModalOpen={setModalOpen} />
      </Modal>)}
    </div>
  )
}

export default EditTicketModal
