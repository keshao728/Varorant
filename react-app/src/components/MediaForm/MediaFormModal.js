import React, { useState } from 'react'
import MediaForm from './MediaForm'
import { Modal } from '../../context/Modal'


const MediaFormModal = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <button className='media-modal-button' onClick={() => setModalOpen(true)}>Add a Image</button>
      {modalOpen && (<Modal onClose={() => setModalOpen(false)}>
        <MediaForm setModalOpen={setModalOpen} />
      </Modal>)}
    </div>
  )
}

export default MediaFormModal
