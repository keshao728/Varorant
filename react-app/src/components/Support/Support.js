import varorantW from '../Home/HomeAssets/varorantW.png'
import './Support.css'


const Support = () => {


  return (
    <div className='support-mother'>
      <div className='support-top-wrapper'>
        <div className='support-top'>
          <img className='support-title' src={varorantW} />
          <button></button>
        </div>
      </div>
      <div>
        <div>MY TICKETS</div>
        <div>SUBMIT A TICKET</div>
        <div>VIEW OTHER TICKETS</div>
        <div>USEFUL ERROR CODES</div>
      </div>
    </div>
  )
}

export default Support
