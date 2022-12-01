import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import varorantW from '../Home/HomeAssets/varorantW.png'
import submitTicket from './supportImages/submitTicket.png'
import userTicket from './supportImages/userTicket.png'
import './Support.css'


const Support = () => {
  const sessionUser = useSelector(state => state.session.user);
  // const history = useHistory();


  return (
    <div className='support-mother'>
      <div className='support-top-wrapper'>
        <div className='support-top'>
          <img className='support-title' src={varorantW} />
          <button></button>
        </div>
      </div>
      {sessionUser ?
        <div className="support-ticket-icons">
          <NavLink to='/tickets/my-tickets' exact={true} className="support-ticket" activeClassName='active'>
            <img className="support-icon" src={userTicket} />
            <div className="support-name">
              MY TICKETS
            </div>
          </NavLink>
          <NavLink to='/tickets/new' exact={true} className="support-ticket" activeClassName='active'>
            <img className="support-icon" src={submitTicket} />
            <div className="support-name">
              SUBMIT A TICKET
            </div>
          </NavLink>
          {/* <div>SUBMIT A TICKET</div> */}
          {/* <div>VIEW OTHER TICKETS</div>
      <div>USEFUL ERROR CODES</div> */}
        </div> :
        <div>
          <div className="support-ticket-icons">
            <NavLink to='/tickets/my-tickets' exact={true} className="support-ticket" activeClassName='active'>
              <img className="support-icon" src={userTicket} />
              <div className="support-name">
                MY TICKETS
              </div>
            </NavLink>
            <NavLink to='/tickets/new' exact={true} className="support-ticket" activeClassName='active'>
              <img className="support-icon" src={submitTicket} />
              <div className="support-name">
                SUBMIT A TICKET
              </div>
            </NavLink>
          </div>
          {/* <div>SUBMIT A TICKET</div> */}
          {/* <div>VIEW OTHER TICKETS</div>
    <div>USEFUL ERROR CODES</div> */}
        </div>
      }
    </div>
  )
}

export default Support
