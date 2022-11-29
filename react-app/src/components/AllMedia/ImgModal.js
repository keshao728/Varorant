import close from '../Navigation/NavImages/close.png'
import './imgModal.css'


const ImgModal = ({ clickedImg, setClickedImg, clickRight, clickLeft, imgTitle }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('close-me')) {
      setClickedImg(null);
    }
  }

  return (
    <div className="img-modal-wrapper close-me" onClick={handleClick}>
      <div className='img-modal-content'>
        <img className="clicked-img" src={clickedImg} />
        <div className='img-title-buttons'>
          <div onClick={clickLeft} className="modal-left">
            <i class="fa-solid fa-angle-left"></i>
          </div>
          <div onClick={clickRight} className="modal-right">
            <i class="fa-solid fa-angle-right"></i>
          </div>
          <div><i class="fa-regular fa-image"></i></div>
          <div> {imgTitle}</div>
        </div>
        <img className="close-img-modal close-me" src={close} onClick={handleClick} />
      </div>
    </div>
  )
}

export default ImgModal;
