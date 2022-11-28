import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';

import { getUserTicketsThunk } from '../../store/ticket';
import varorantW from '../Home/HomeAssets/varorantW.png'

import * as moment from 'moment';
import './UserTicket.css'
import '../TicketForm/TicketForm.css'

const UserTickets = () => {
  const dispatch = useDispatch();
  const allTickets = useSelector((state) => state.ticket);
  const allTicketsArr = Object.values(allTickets);
  const sessionUser = useSelector(state => state.session.user);
  console.log("ALLTICKETS", allTickets)

  useEffect(() => {
    dispatch(getUserTicketsThunk())
  }, [dispatch])

  const userTicket = allTicketsArr?.filter((ticket) => ticket.user_id === sessionUser.id)
  console.log("USER TICKET", userTicket)

  return (
    <div className="my-ticket-wrapper">
      <div className='ticket-top-wrapper'>
        <img className='ticket-title' src={varorantW} />
      </div>

      <div className='ticket-support-wrapper'>
        <NavLink to='/support' exact={true} className="ticket-support" activeClassName='active'>
          VALORANT Support
        </NavLink>
        <div className="ticket-support">
          >
        </div>
        <div>
          My activities
        </div>
      </div>

      <div className="my-ticket-top">
        <div className="my-tickets">
          <div className='my-ticket-title'>
            My Tickets
          </div>
          <div>
            <div>
              SUBJECT
            </div>
            <div>
              TICKET ID
            </div>
            <div>
              CREATED AT
            </div>
          </div>
          {userTicket?.map((ticket) => (
            <div className="individual-ticket">
              <div>{ticket.subject}</div>
              <div>
                #{ticket.id}
              </div>
              <div>
                <div className="ticket-time-stamp">{moment(ticket.created_at).fromNow()}</div>
                {/* {ticket.created_at.split(' ').slice(0, -2).join(' ')} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserTickets;
