import { Modal } from '../../context/Modal';
import close from "./NavImages/close.png"
import './PlayNowModal.css';

const GenericModal = ({ showModal, closeModal, onMakeOne, onSignIn }) => {
  return (
    <>
      {showModal && (
        <Modal onClose={closeModal}>
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
                    onClick={onMakeOne}>
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
                    onClick={onSignIn}>
                    SIGN IN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default GenericModal;
