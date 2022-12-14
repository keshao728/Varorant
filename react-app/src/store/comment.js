const GET_ALL_COMMENTS = 'tracks/getAllComments';

// const GET_ONE_COMMENT = 'tracks/getOneComment';

// const GET_USER_COMMENTS = 'tracks/getUserComments';

const CREATE_COMMENT = 'tracks/createComment';

const EDIT_COMMENT = 'tracks/editComment';

const DELETE_COMMENT = 'tracks/deleteComment';


//actions


//get all comments

const actionGetComments = (ticketId) => {
    return {
        type: GET_ALL_COMMENTS,
        ticketId
    }
}



//create a comment

const actionCreateComment = (ticketId, commentCreated) => {
    return {
        type: CREATE_COMMENT,
        ticketId,
        commentCreated
    }
}



// //edit a comment

const actionEditComment = (commentEdit) => {
    return {
        type: "EDIT_COMMENT",
        // commentId,
        commentEdit
    }
}



//delete a comment

const actionDeleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}




//thunks

//get all comments
export const getAllComments = (ticketId) => async (dispatch) => {
    const response = await fetch(`/api/tickets/${ticketId}`)

    if (response.ok) {
        const comments = await response.json();
        // console.log("THIS IS RESPONSE OK - COMMENTS IN GETALLCOMMENTS", comments)
        await dispatch(actionGetComments(comments))
        return comments
    }
}



//create comment

export const createComment = (ticketId, comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${ticketId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const comment = await response.json();
        await dispatch(actionCreateComment(ticketId, comment))
        return comment
    }
}
//edit comment
export const editComment = (comment) => async (dispatch) => {
    // console.log("THIS IS COMMENT IN EDITCOMMENT THUNK", comment)
    const response = await fetch(`/api/comments/${comment.id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const comment = await response.json();
        await dispatch(actionEditComment(comment))
        return comment
    }
}

//delete comment
export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })
    console.log("THIS IS RESPONSE IN DELETECOMMENT", response)

    if (response.ok) {
        const deletedComment = await response.json();
        await dispatch(actionDeleteComment(commentId));
        return deletedComment
    }
    return console.log("DELETE-COMMENT-THUNK-ERROR", response)

}


const initialState = {
    comments: {},
    user: {}
};

const commentReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_ALL_COMMENTS: {
            let newAllCommentsObject = {}
            newState = {
                ...state,
                comments: { ...state.comments },
                user: { ...state.user }
            }
            action.ticketId.Comments.forEach(comment => {
                newAllCommentsObject[comment.id] = comment
            });
            newState.comments = newAllCommentsObject
            return newState
        }
        case CREATE_COMMENT: {
            newState = {
                ...state,
                comments: { ...state.comments },
                user: { ...state.user }
            }
            newState.comments[action.commentCreated.id] = action.commentCreated
            newState.user = action.commentCreated
            return newState
        }
        case EDIT_COMMENT: {
            newState = {
                ...state,
                comments: { ...state.comments },
                user: { ...state.user }
            }
            newState[action.commentEdit.id] = action.commentEdit
            newState.user = action.commentEdit
            return newState
        }
        case DELETE_COMMENT: {
            newState = {
                ...state,
                comments: { ...state.comments },
                user: { ...state.user }
            }
            delete newState.user[action.commentId]
            delete newState.comments[action.commentId]
            // newState.comments = {}
            return newState
        }
        default:
            return state
    }
}
export default commentReducer
