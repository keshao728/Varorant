import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, Redirect } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import DeleteTicketModal from "./DeleteTicket/DeleteTicketModal";
import EditTicketModal from "../TicketForm/EditTicketForm/EditTicketModal";
import * as moment from 'moment';

import { getOneTicketThunk } from '../../store/ticket';
import varorantW from '../Home/HomeAssets/varorantW.png'

import './SingleTicket.css'
import '../TicketForm/TicketForm.css'
import AllComments from "../Comments/Comments";

const SingleTicket = () => {
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector(state => state.session.user);

  const ticket = useSelector((state) => state.ticket);

  // const comment = useSelector((state) => state.ticket.Comments);
  // console.log("COMMENT", comment)

  const myTicket = ticket[ticketId]
  console.log("MYTICKET", myTicket)

  useEffect(() => {
    dispatch(getOneTicketThunk(ticketId))
      .then(() => setIsLoaded(true))

  }, [dispatch, ticketId])

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  return isLoaded && (
    <div className="single-ticket-mother">
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
          <NavLink to='/tickets/my-tickets' exact={true} className="ticket-support" activeClassName='active'>
            My activities
          </NavLink>
        </div>
      </div>


      <div className="single-ticket-wapper">
        <div className="single-ticket">

          <div className="left-ticket">
            <div className="see-all-ticket">{" "}</div>

            <div className="left-section">
              <div className="left-title">TICKET ID</div>
              <div className="left-item">
                #{myTicket?.id}
              </div>
            </div>

            <div className="left-section">
              <div className="left-title">CREATED</div>
              <div className="left-item">
                {moment(myTicket?.created_at).fromNow()}
              </div>
            </div>

            <div className="left-section">
              <div className="left-title">STATUS</div>
              <div className="left-item">
                {myTicket?.status === null || myTicket?.status === false ? "Open" : "Solved"}
              </div>
            </div>

          </div>

          <div className="right-ticket">
            <div className="right-section">

              <div className="see-all-ticket">
                <NavLink to='/tickets/my-tickets' exact={true} className="see-all-ticket-link" activeClassName='active'>
                  {"< SEE ALL TICKETS"}
                </NavLink>
              </div>

              <div className="single-subject">
                {myTicket?.subject}
              </div>

              <div className="single-des">
                {myTicket?.description}
              </div>

              {myTicket?.attachments ?
                <img className="single-attachments" src={myTicket?.attachments} alt="Attachment" onError={""} /> : ""
              }

              <div className="single-actions">
                <div>
                  {sessionUser.id === myTicket.user_id && <EditTicketModal />}
                </div>

                <div>
                  {sessionUser.id === myTicket.user_id && <DeleteTicketModal />}
                </div>
              </div>
            </div>
            <div>
              <AllComments />
            </div>
          </div>
          <div className="empty-single-tickets"></div>
        </div>
      </div>
    </div>
  )
}

export default SingleTicket
