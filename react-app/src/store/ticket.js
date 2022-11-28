const GET_ALL_TICKETS = 'tickets/GET_ALL_TICKETS';
const GET_ONE_TICKET = 'tickets/GET_ONE_TICKET';
const CREATE_TICKET = 'tickets/CREATE_TICKET';
const EDIT_TICKET = 'tickets/EDIT_TICKET';
const DELETE_TICKET = 'tickets/DELETE_TICKET';

const getAllTicketAction = (tickets) => ({
  type: GET_ALL_TICKETS,
  tickets
})

const getOneTicketAction = (ticket) => ({
  type: GET_ONE_TICKET,
  ticket
})

const createTicketAction = (ticket) => ({
  type: CREATE_TICKET,
  ticket
})

const editTicketAction = (ticketId) => ({
  type: EDIT_TICKET,
  ticketId
})

const deleteTicketAction = (ticketId) => ({
  type: DELETE_TICKET,
  ticketId
})


//THUNK
export const getAllTicketsThunk = () => async (dispatch) => {
  const response = await fetch('/api/tickets');
  console.log("RESPONSE", response)
  if (response.ok) {
    const ticketsData = await response.json();
    dispatch(getAllTicketAction(ticketsData));
    return ticketsData;
  }
  return console.log("GET-ALL-TICKET-THUNK-ERROR", response)
}

export const getOneTicketThunk = (ticketId) => async (dispatch) => {
  const response = await fetch(`/api/tickets/${ticketId}`);

  if (response.ok) {
    const ticketData = await response.json();
    dispatch(getOneTicketAction(ticketData));
    return ticketData;
  }
  return console.log("GET-ONE-TICKET-THUNK-ERROR", response)
}

export const createTicketThunk = (ticket) => async (dispatch) => {
  const response = await fetch('/api/tickets/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticket)
  });

  if (response.ok) {
    const ticketData = await response.json();
    dispatch(createTicketAction(ticketData));
    return ticketData;
  }
  return console.log("CREATE-TICKET-THUNK-ERROR", response)
}

export const editTicketThunk = (ticketId, ticket) => async (dispatch) => {
  const response = await fetch(`/api/tickets/${ticketId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticket)
  });

  if (response.ok) {
    const ticketData = await response.json();
    dispatch(editTicketAction(ticketData));
    return ticketData;
  }
  return console.log("EDIT-TICKET-THUNK-ERROR", response)
}

export const deleteTicketThunk = (ticketId) => async (dispatch) => {
  const response = await fetch(`/api/tickets/${ticketId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const ticketData = await response.json();
    dispatch(deleteTicketAction(ticketData));
    return ticketData;
  }
  return console.log("DELETE-TICKET-THUNK-ERROR", response)
}

const initialState = {};

const ticketReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_TICKETS:
      newState = {};
      action.tickets.forEach((ticket) => {
        newState[ticket.id] = ticket;
      });
      return newState;
    case GET_ONE_TICKET:
      newState = { ...state };
      newState[action.ticket.id] = action.ticket;
      return newState;
    case CREATE_TICKET:
      newState = { ...state };
      newState[action.ticket.id] = action.ticket;
      return newState;
    case EDIT_TICKET:
      newState = { ...state };
      newState[action.ticketId.id] = action.ticketId;
      return newState;
    case DELETE_TICKET:
      newState = { ...state };
      delete newState[action.ticketId];
      return newState;
    default:
      return state;
  }
}

export default ticketReducer;
