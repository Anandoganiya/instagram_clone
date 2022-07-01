import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AddComment from "./AddComment";

const Comments = ({ docId, dateCreated, comments, commentInput }) => {
  const [comment, setComment] = useState(comments);
  const [commentsSlice, setCommentsSlice] = useState(3);
  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  return (
    <div>
      {comment.slice(0, commentsSlice).map((item, index) => (
        <div className="flex space-x-3 m-1" key={index}>
          <Link to={`/p/${item.displayName}`}>
            <p className="font-semibold">{item.displayName}</p>
          </Link>
          <p>{item.comment}</p>
        </div>
      ))}
      {comment.length >= 3 && commentsSlice < comment.length && (
        <button
          className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
          type="button"
          onClick={showNextComments}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              showNextComments();
            }
          }}
        >
          View more comments
        </button>
      )}
      <div className="m-1">{formatDistance(dateCreated, new Date())} ago</div>
      <AddComment
        docId={docId}
        commentInput={commentInput}
        comment={comment}
        setComment={setComment}
      />
    </div>
  );
};

export default Comments;
