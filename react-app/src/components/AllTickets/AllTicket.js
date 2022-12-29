import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';

import { getAllTicketsThunk } from '../../store/ticket';
import varorantW from '../Home/HomeAssets/varorantW.png'

import * as moment from 'moment';
import '../UserTickets/UserTicket.css'
import '../TicketForm/TicketForm.css'

const UserTickets = () => {
  const dispatch = useDispatch();
  const allTickets = useSelector((state) => state.ticket);
  const allTicketsArr = Object.values(allTickets);

  const recentTickets = []
  for (let i = allTicketsArr.length - 1; i >= 0; i--) {
    recentTickets.push(allTicketsArr[i])
  }

  const sessionUser = useSelector(state => state.session.user);
  // console.log("ALLTICKETS", allTickets)
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    dispatch(getAllTicketsThunk())
      .then(() => setIsLoaded(true))

  }, [dispatch])

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  return isLoaded && (
    <div className="my-ticket-wrapper">
      <div className='ticket-top-wrapper'>
        <img className='ticket-title' src={varorantW} alt="Banner"/>
      </div>

      <div className='ticket-support-wrapper'>
        <NavLink to='/support' exact={true} className="ticket-support" activeClassName='active'>
          VARORANT Support
        </NavLink>
        <div className="ticket-support">
          {">"}
        </div>
        <div>
          My activities
        </div>
      </div>

      <div className="my-ticket-top">
        <div className="my-tickets">
          <div className='my-ticket-title'>
            All Tickets
          </div>
          <div className="ticket-table-fields">
            <div className="ticket-table-subject-1">
              SUBJECT
            </div>
            <div className="ticket-table-id-1">
              TICKET ID
            </div>
            <div className="ticket-table-created-1">
              CREATED AT
            </div>
            <div className="ticket-table-status-1">
              STATUS
            </div>
          </div>
          {recentTickets?.map((ticket) => (
            <div className="individual-ticket">
              <div className="ticket-table-subject-2">
                <NavLink className="ticket-subject-link" to={`/tickets/${ticket.id}`}>
                  {ticket.subject}
                </NavLink>
              </div>
              <div className="ticket-table-id-2">
                #{ticket.id}
              </div>
              <div className="ticket-table-created-2">
                <div>{moment(ticket.created_at).fromNow()}</div>
                {/* {ticket.created_at.split(' ').slice(0, -2).join(' ')} */}
              </div>
              <div className="ticket-table-status-2">{ticket.status === null || ticket.status === false ? "Open" : "Solved"}</div>
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}

export default UserTickets;
