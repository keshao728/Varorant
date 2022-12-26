import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editComment, getAllComments } from "../../../store/comment";

import "./EditComment.css";

const EditComment = ({ setShowEdit, comment }) => {
  const dispatch = useDispatch();
  const { ticketId } = useParams();


  const [userComments, setUserComments] = useState(comment.comment_body);
  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true)

    if (!validationErrors.length) {
      setShowErrors(false)
      const newComment = {
        id: comment.id,
        comment_body: userComments,
      };
      let createdComment = await dispatch(editComment(newComment))
      if (createdComment) {
        setShowErrors(false)
        setShowEdit(false)
      }
    }
  }

  const closeSubmit = (e) => {
    e.preventDefault();
    setShowErrors(false)
    setShowEdit(false);
  };


  useEffect(() => {
    dispatch(getAllComments(ticketId))
  }, [dispatch, ticketId])

  return (
    <div>
      <form className="comment-form-parent" onSubmit={handleSubmit}>
        <div className="comment-form">
          <label>
            <div className="commenter-img-input">
              <textarea
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
          <div className="edit-comment-button-wrapper">
            <button className="edit-submit-comment-button" type="submit" onSubmit={handleSubmit}> Update</button>
            <button type="button" className="edit-cancel-comment-button" onClick={closeSubmit}>Cancel</button>

          </div>
        </div>
      </form>
    </div>
  )
}

export default EditComment;
