import React from "react";

const CommentTile = ({ user, comment }) => {

  return (
    <div>
      <div>
        <h5>{comment.username}</h5>
      </div>
    </div>
  )
}

export default CommentTile