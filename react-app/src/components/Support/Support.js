import { NavLink } from 'react-router-dom';
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
        <div>
          <NavLink to='/tickets/my-tickets' exact={true} className="support-ticket" activeClassName='active'>
            MY TICKETS
          </NavLink>
        </div>
        <div>
          <NavLink to='/tickets/new' exact={true} className="support-ticket" activeClassName='active'>
            SUBMIT A TICKET
          </NavLink>
        </div>
        {/* <div>SUBMIT A TICKET</div> */}
        <div>VIEW OTHER TICKETS</div>
        <div>USEFUL ERROR CODES</div>
      </div>
    </div>
  )
}

export default Support
