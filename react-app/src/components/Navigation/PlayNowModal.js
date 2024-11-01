import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import GenericModal from './GenericPlayModal';
import './PlayNowModal.css';

const PlayNow = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMakeOne = () => {
    setShowModal(false);
    navigate("/sign-up");
  };

  const handleSignIn = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div className="playnow-modal-mother">
      <button className="nav-playnow-modal-button" onClick={() => setShowModal(true)}>
        JOIN NOW
      </button>
      <GenericModal
        showModal={showModal}
        closeModal={closeModal}
        onMakeOne={handleMakeOne}
        onSignIn={handleSignIn}
      />
    </div>
  );
};

export default PlayNow;
