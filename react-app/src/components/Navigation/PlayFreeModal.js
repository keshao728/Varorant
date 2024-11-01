import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GenericModal from './GenericPlayModal';
import './PlayFreeModal.css';
import './PlayNowModal.css';

const PlayFree = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

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
      {!sessionUser ? (
        <div className="playfree-border">
          <button
            className="playnow-button"
            id="playnow-play-free"
            onClick={() => setShowModal(true)}>
            JOIN FREE
          </button>
        </div>
      ) : (
        <div className="playfree-border">
          <button
            className="playnow-button"
            id="playnow-play-free"
            onClick={() => navigate("/tickets")}>
            VIEW ALL TICKETS
          </button>
        </div>
      )}
      <GenericModal
        showModal={showModal}
        closeModal={closeModal}
        onMakeOne={handleMakeOne}
        onSignIn={handleSignIn}
      />
    </div>
  );
};

export default PlayFree;
