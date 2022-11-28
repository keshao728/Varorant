import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { getOneTicketThunk } from '../../store/ticket';
import varorantW from '../Home/HomeAssets/varorantW.png'

import './SingleTicket.css'
import '../TicketForm/TicketForm.css'

const SingleTicket = () => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.ticket);
  const ticketArr = Object.values(ticket);

  const myTicket = ticketArr[0]

  console.log("TICKET", myTicket)
  // console.log("TICKET ARR", ticketArr)

  useEffect(() => {
    dispatch(getOneTicketThunk(ticketId))
  }, [dispatch, ticketId])

  return (
    <div className="single-ticket-wrapper">
      <div className='ticket-top-wrapper'>
        <img className='ticket-title' src={varorantW} />
      </div>

      <div className='ticket-support-wrapper'>
        <NavLink to='/support' exact={true} className="ticket-support" activeClassName='active'>
          VARORANT Support
        </NavLink>
        <div className="ticket-support">
          >
        </div>
        <div>
          <NavLink to='/tickets/my-tickets' exact={true} className="ticket-support" activeClassName='active'>
            My activities
          </NavLink>
        </div>
      </div>


      <div>
        <div className="single-ticket">
          <div className="left-ticket">
            <div className="single-subject">
              {ticket.subject}
            </div>
          </div>
          <div className="right-ticket">

          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleTicket
