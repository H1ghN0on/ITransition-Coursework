import { Api } from "@api";
import { Input } from "@components/Common";
import socket from "@core/socket";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { addComment } from "@redux/itemSlice";
import React from "react";

const Head = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);
  const comments = useAppSelector((state) => state.itemSlice.comments);
  const [value, setValue] = React.useState<string>("");
  const item = useAppSelector((state) => state.itemSlice.item);
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!value) return;
    const { comment, user } = await Api().createComment(item!.id, value);
    dispatch(addComment({ comment, user }));
    socket.emit("send-comment", { comment, user });
    setValue("");
  };

  return (
    <div className="py-3">
      <h3 className="text-black text-2xl font-bold mb-3">
        {comments.length} Comments
      </h3>
      <form>
        <Input
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="h-5 rounded-full text-sm w-[50%] max-w-[100%]"
          value={value}
          name="comment"
          type="text"
          label="Write your comment"
          placeholder="Your comment..."
          iconBtn
          iconClassName="cursor-pointer ml-3 text-lg"
          onIconClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Head;
