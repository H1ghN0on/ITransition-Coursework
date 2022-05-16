import { Head, Comment } from "@components/Comments";
import { useAppSelector } from "@redux/hooks";
import React from "react";

const Comments = () => {
  const user = useAppSelector((state) => state.userSlice);
  const comments = useAppSelector((state) => state.itemSlice.comments);

  return (
    <div className="flex flex-col p-5 space-y-3">
      {<Head editable={user.id !== -1} />}
      <div className="space-y-3">
        {comments &&
          comments.map((comment) => (
            <Comment
              key={comment.comment.id}
              text={comment.comment.text}
              owner={comment.user.username}
              date={comment.comment.createdAt}
              imageURL={comment.user.avatarURL}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
