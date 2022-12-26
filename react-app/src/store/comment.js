const GET_ALL_COMMENTS = 'tracks/getAllComments';

// const GET_ONE_COMMENT = 'tracks/getOneComment';

// const GET_USER_COMMENTS = 'tracks/getUserComments';

const CREATE_COMMENT = 'tracks/createComment';

// const EDIT_COMMENT = 'tracks/editComment';

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

// const actionEditComment = (commentEdit) => {
//     return {
//         type: "EDIT_COMMENT",
//         commentEdit
//     }
// }



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
        // console.log('this is the comments', comments)
        const valuearr = Object.values(comments.Comments)
        // console.log('this is valuearr',valuearr)
        valuearr.forEach(async (comment) => {
            const usernamedict = await fetch(`/api/users/${comment.user_id}/special`)
            // console.log('usernamedict', usernamedict)
            const username = await usernamedict.json()
            // console.log('username', username)
            comment.username = username.username
        })
        await dispatch(actionGetComments(comments));
        // console.log('this is the comments', comments)
        return comments
    }
}



//create comment

export const createComment = (ticketId, comment) => async (dispatch) => {
    // console.log("THIS IS TRACK ID IN CREATECOMMENT", ticketId)
    // console.log("THIS IS COMMENT IN CREATECOMMENT", comment)
    const response = await fetch(`/api/tickets/${ticketId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const comment = await response.json();
        // console.log("THIS IS RESPONSE OK - COMMENT IN CREATECOMMENT", comment)
        await dispatch(actionCreateComment(ticketId, comment))
        return comment
    }
}


//delete comment

export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comment/${commentId}`, {
        method: "DELETE",
    })

    if (response.ok) {
        const deletedComment = await response.json();
        await dispatch(actionDeleteComment(commentId));
        return deletedComment
    }
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
        // case EDIT_COMMENT: {
        //     newState = { ...state }
        //     newState[action.comment.id] = action.comment
        //     return newState
        // }
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
