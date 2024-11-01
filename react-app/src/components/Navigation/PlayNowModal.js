import { useState } from "react";
import { Modal } from '../../context/Modal';
import { NavLink, useNavigate } from 'react-router-dom';
// import LoginForm from "../auth/LoginForm";
// import SignUpForm from "../auth/SignUpForm";
import close from "./NavImages/close.png"
import './PlayNowModal.css';

const PlayNow = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="playnow-modal-mother">
      <button className="nav-playnow-modal-button" onClick={() => setShowModal(true)}> JOIN NOW </button>

      {showModal && (
        <Modal onClose={closeModal}>
          {/* <button type="button" className="cancel-create-annotation" onClick={closeModal}>Cancel</button> */}
          <div className="playnow-modal-wrapper">
            <div className="playnow-cancel">
              <img
                className="playnow-cancel-img"
                onClick={closeModal}
                src={close}
                alt="Cancel"
              />
            </div>
            <div className="playnow-title">
              <div>\</div>
              <div className="playnow-title-text">
                GET SET UP TO CREATE
              </div>
              <div>\</div>
            </div>
            <div className="playnow-buttons">

              <div>
                <div className="playnow-individual-text">I dont't have a Meowit account yet</div>
                <div className="playnow-individual-border">
                  <button
                    className="playnow-individual-button"
                    id="playnow-make-one"
                    onClick={() => {
                      setShowModal(false);
                      navigate("/sign-up")
                    }}>
                    MAKE ONE
                  </button>
                </div>
              </div>
              <div>
                <div className="playnow-individual-text">I have a Meowit account</div>
                <div className="playnow-individual-border">
                  <button
                    className="playnow-individual-button"
                    id="playnow-sign-in"
                    onClick={() => {
                      setShowModal(false);
                      navigate("/login")
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
