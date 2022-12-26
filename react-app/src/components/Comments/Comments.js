
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"
import { getAllComments, createComment, deleteComment } from "../../store/comment";

import * as moment from 'moment';
import "./Comments.css"

const AllComments = () => {
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  // const pfp = useSelector(state => state.session.user?.profile_img)
  // console.log("THIS IS SESSION USER IN ALLCOMMENTS", sessionUser)
  // const track = useSelector(state => state.tracks)

  const comments = useSelector((state) => state.comment.comments);
  const commentsArr = Object.values(comments);
  // console.log("COMMENTS", commentsArr);

  const [userComments, setUserComments] = useState("");
  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)


  const openSubmit = () => {
    if (showSubmit) return;
    setShowSubmit(true);
  };


  const closeSubmit = (e) => {
    e.preventDefault();
    setShowErrors(false)
    setShowSubmit(false);
  };


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
                    {moment(comment?.created_at).fromNow()}
                  </div>
                </div>
              </div>
              <div className="comment-des">
                {comment.comment_body}
              </div>
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}

export default AllComments;
