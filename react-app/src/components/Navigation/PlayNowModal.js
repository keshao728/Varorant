import { useState } from "react";
import { Modal } from '../../context/Modal';
import { NavLink, useHistory } from 'react-router-dom';
// import LoginForm from "../auth/LoginForm";
// import SignUpForm from "../auth/SignUpForm";
import close from "./NavImages/close.png"
import './PlayNowModal.css';

const PlayNow = () => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="playnow-modal-mother">
      <button onClick={() => setShowModal(true)}> PLAY NOW </button>

      {showModal && (
        <Modal onClose={closeModal}>
          {/* <button type="button" className="cancel-create-annotation" onClick={closeModal}>Cancel</button> */}
          <div className="playnow-modal-wrapper">
            <img
              className="playnow-cancel"
              onClick={closeModal}
              src={close}
            />
            <div className="playnow-title">
              <div>\</div>
              <div className="playnow-title-text">
                GET SET UP TO PLAY
              </div>
              <div>\</div>
            </div>
            <div className="playnow-buttons">

              <div>
                <div className="playnow-individual-text">I dont't have a Riot account yet</div>
                <div className="playnow-individual-border">
                  <button
                    className="playnow-individual-button"
                    id="playnow-make-one"
                    onClick={() => {
                      setShowModal(false);
                      history.push("/sign-up")
                    }}>
                    MAKE ONE
                  </button>
                </div>
              </div>
              <div>
                <div className="playnow-individual-text">I have a Riot account</div>
                <div className="playnow-individual-border">
                  <button
                    className="playnow-individual-button"
                    id="playnow-sign-in"
                    onClick={() => {
                      setShowModal(false);
                      history.push("/login")
                    }}>
                    SIGN IN
                  </button>
                </div>
              </div>
            </div>
          </div>

        </Modal>
      )}
    </div>
  )
}

export default PlayNow;
