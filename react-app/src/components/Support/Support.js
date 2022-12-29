import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import varorantW from '../Home/HomeAssets/varorantW.png'
import submitTicket from './supportImages/submitTicket.png'
import userTicket from './supportImages/userTicket.png'
import './Support.css'


const Support = () => {
  const sessionUser = useSelector(state => state.session.user);
  // const history = useHistory();
  // const allTicketRef = useRef(null);
  // const root = useRef(null);

  // useEffect(() => {
  //   try {

  //     root.current = allTicketRef?.current?.attachShadow({ mode: 'open' });

  //     const div = document.createElement('div');
  //     div.textContent = '';
  //     root.current.appendChild(div);

  //     const style = document.createElement('style');
  //     style.textContent = `
  //     div{
  //       background-color: #1a1a1a;
  //       height: 20px;
  //       width: 20px;
  //       position:relative;
  //     }
  //     `
  //     root.current.appendChild(style);
  //   }
  //   catch (e) {
  //     console.log(e)
  //   }
  // }, [])

  return (
    <div className='support-mother'>
      <div className='support-top-wrapper'>
        <div className='support-top'>
          <img className='support-title' src={varorantW} alt="Banner" />
          {/* <button></button> */}
        </div>
      </div>
      {sessionUser ?
        <div className="support-ticket-icons">
          <NavLink to='/tickets/my-tickets' exact={true} className="support-ticket" activeClassName='active'>
            <img className="support-icon" src={userTicket} alt="My Tickets" />
            <div className="support-name">
              MY TICKETS
            </div>
          </NavLink>
          <NavLink to='/tickets/new' exact={true} className="support-ticket" activeClassName='active'>
            <img className="support-icon" src={submitTicket} alt="Submit Ticket" />
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
            <NavLink to='/login' exact={true} className="support-ticket" activeClassName='active'>
              <img className="support-icon" src={userTicket} alt="My Tickets" />
              <div className="support-name">
                MY TICKETS
              </div>
            </NavLink>
            <NavLink to='/login' exact={true} className="support-ticket" activeClassName='active'>
              <img className="support-icon" src={submitTicket} alt="Submit Ticket" />
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
      {/* <div ref={allTicketRef}></div> */}
    </div>
  )
}

export default Support
