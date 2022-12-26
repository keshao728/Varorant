
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"
import { getAllComments, createComment, deleteComment } from "../../store/comment";

import * as moment from 'moment';
import "./Comments.css"
import EditComment from "./EditCommentForm/EditComment";

const AllComments = () => {
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  // const pfp = useSelector(state => state.session.user?.profile_img)
  // console.log("THIS IS SESSION USER IN ALLCOMMENTS", sessionUser)
  // const track = useSelector(state => state.tracks)

  const comments = useSelector((state) => state.comment.comments);
  const commentsArr = Object.values(comments);

  const ticket = useSelector((state) => state.ticket)

  const ticketArr = Object.values(ticket)
  const ticketStatus = ticketArr[0].status

  const [userComments, setUserComments] = useState("");
  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const [showEdit, setShowEdit] = useState(false)



  function isEmpty(str) {
    if (!str.trim().length)
      return { border: "1px solid red" }
  }


  useEffect(() => {
    const errors = []
    if (!userComments || userComments === "" || isEmpty(userComments)) errors.push('Comment is Required')
    if (userComments.length > 200) errors.push("Please enter less than 200 characters")

    setValidationErrors(errors)
  }, [userComments])


  useEffect(() => {
    dispatch(getAllComments(ticketId))
      .then(() => setIsLoaded(true))
  }, [dispatch, ticketId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true)

    if (!validationErrors.length) {
      setShowErrors(false)
      const newComment = {
        comment_body: userComments
        // user_id:
      };
      setUserComments("");
      let createdComment = await dispatch(createComment(ticketId, newComment))
      if (createdComment) {
        setShowErrors(false)
      }
    }
  }


  return isLoaded && (
    <div className="comment-wrapper">
      <div>
        {commentsArr.map((comment) => {
          return (
            <div className="individual-comment">
              <div className="comment-user-info">
                <img className="comment-pfp" src="https://i.imgur.com/2DrReGq.jpg"></img>
                <div className="comment-user-des">
                  <div className="comment-user">
                    {comment.commentter.username}
                  </div>
                  <div className="comment-des">
                    {moment(comment?.created_at).format('MMMM D, YYYY HH:mm')}
                  </div>
                </div>
              </div>
              {sessionUser?.id === comment.user_id ?
                <div>
                  {showEdit === comment.id ? <EditComment comment={comment} setShowEdit={setShowEdit} /> :
                    <div>
                      <div className="comment-des">
                        {comment.comment_body}
                      </div>
                      <div className="edit-actions">
                        <button className="comment-button"
                          onClick={() => setShowEdit(comment.id)}>
                          Edit
                        </button>
                        <button className="comment-button"
                          onClick={async () => await dispatch(deleteComment(comment?.id))}>
                          Delete
                        </button>
                      </div>
                    </div>

                  } </div> :
                <div className="comment-des">
                  {comment.comment_body}
                </div>
              }
            </div>
          )
        }
        )}
      </div>
      {!ticketStatus &&
        <div className="comment-form-wrapper">
          <form className="comment-form-parent" onSubmit={handleSubmit}>
            <div className="comment-form">
              <label>
                <div className="commenter-img-input">

                  {/* <img alt="comment-img" className="commenter-img" src={pfp ? pfp : defaultpro}></img> */}
                  <textarea
                    placeholder="Type a response..."
                    type="text"
                    error
                    className="comment-input"
                    value={userComments}
                    required
                    onChange={(e) => setUserComments(e.target.value)}
                  />
                </div>
                {showErrors && (
                  <ul className="comment-form-errors">
                    {validationErrors.length > 0 &&
                      validationErrors.map(error => (
                        <li className="comment-form-error-text" key={error}>{error}</li>
                      ))}
                  </ul>
                )
                }
              </label>
              <div className="comment-button-wrapper">
                <button className="button-create-comment" type="submit" onSubmit={handleSubmit}> Submit</button>
              </div>
            </div>
          </form>
        </div>
      }
    </div>
  )
}

export default AllComments;
