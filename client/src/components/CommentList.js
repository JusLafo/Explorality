import React from "react";
import CommentTile from "./CommentTile.js";

const CommentList = ({ user, comments }) => {
  console.log(comments)
  let commentTiles = ""
  commentTiles = comments.map(comment => {
    return (
      <CommentTile
        key={comment.id}
        comment={comment}
        user={user}
      />
    )
  })

  return (
    <div>
      <ul>
        {commentTiles}
      </ul>
    </div>
  )
}

export default CommentList