import { useState } from "react";
import { Modal } from '../../context/Modal';
import { NavLink, useHistory } from 'react-router-dom';
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";

const PlayNow = () => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}> PLAY NOW </button>

      {showModal && (
        <Modal onClose={closeModal}>
          <div>
            GET SET UP TO PLAY
          </div>
          <div>
            <div>I dont't have a Riot account yet</div>
            <button onClick={() => {
              setShowModal(false);
              history.push("/sign-up")
            }}>
              MAKE ONE
            </button>
          </div>
          <div>
            <div>I have a Riot account</div>
            <button onClick={() => {
              setShowModal(false);
              history.push("/login")
            }}>
              SIGN IN
            </button>
          </div>

        </Modal>
      )}
    </>
  )
}

export default PlayNow;
