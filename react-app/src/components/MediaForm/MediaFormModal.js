import React, { useState } from 'react'
import MediaForm from './MediaForm'
import { Modal } from '../../context/Modal'

import './MediaFormModal.css'


const MediaFormModal = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className='media-modal-wrapper'>
      <button className='media-modal-button' onClick={() => setModalOpen(true)}>Add a Image</button>
      {modalOpen && (<Modal onClose={() => setModalOpen(false)}>
        <MediaForm setModalOpen={setModalOpen} />
      </Modal>)}
    </div>
  )
}

export default MediaFormModal
