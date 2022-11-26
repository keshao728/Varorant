const GET_ALL_MEDIA = 'media/GET_ALL_MEDIA';
const GET_ONE_MEDIA = 'media/GET_ONE_MEDIA';
const EDIT_MEDIA = 'media/EDIT_MEDIA';
const DELETE_MEDIA = 'media/DELETE_MEDIA';

const getAllMediaAction = (media) => ({
  type: GET_ALL_MEDIA,
  media
})

const getOneMediaAction = (media) => ({
  type: GET_ONE_MEDIA,
  media
})

const editMediaAction = (mediaId) => ({
  type: EDIT_MEDIA,
  mediaId
})

const deleteMediaAction = (mediaId) => ({
  type: DELETE_MEDIA,
  mediaId
})

export const getAllMediaThunk = () => async (dispatch) => {
  const response = await fetch('/api/media');

  if (response.ok){
    const mediaData = await response.json();
    dispatch(getAllMediaAction(mediaData));
    return mediaData;
  }
  return console.log("GET-ALL-MEDIA-THUNK-ERROR", response)
}

export const getOneMediaThunk = (mediaId) => async (dispatch) => {
  const response = await fetch(`/api/media/${mediaId}`);

  if (response.ok){
    const mediaData = await response.json();
    dispatch(getOneMediaAction(mediaData));
    return mediaData;
  }
  return console.log("GET-ONE-MEDIA-THUNK-ERROR", response)
}


export const editMediaThunk = (mediaId, media) => async (dispatch) => {
  const response = await fetch(`/api/media/${mediaId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(media)
  });

  if (response.ok){
    const mediaData = await response.json();
    dispatch(editMediaAction(mediaData));
    return mediaData;
  }
  return console.log("EDIT-MEDIA-THUNK-ERROR", response)
}

export const deleteMediaThunk = (mediaId) => async (dispatch) => {
  const response = await fetch(`/api/media/${mediaId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.ok){
    const mediaData = await response.json();
    dispatch(deleteMediaAction(mediaData));
    return mediaData;
  }
  return console.log("DELETE-MEDIA-THUNK-ERROR", response)
}

const initialState = {};

const mediaReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_MEDIA:
      newState = {};
      action.media.forEach((media) => {
        newState[media.id] = media;
      });
      return newState;
    case GET_ONE_MEDIA:
      newState = {...state};
      newState[action.media.id] = action.media;
      return newState;
    case EDIT_MEDIA:
      newState = {...state};
      newState[action.mediaId.id] = action.mediaId;
      return newState;
    case DELETE_MEDIA:
      newState = {...state};
      delete newState[action.mediaId.id];
      return newState;
    default:
      return state;
  }
}

export default mediaReducer;
