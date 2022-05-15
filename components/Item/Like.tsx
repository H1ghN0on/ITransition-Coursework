import { Api } from "@api";
import { IconSpan } from "@components/Common";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setLike } from "@redux/itemSlice";
import React from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { LikeType } from "@types";

interface LikeProps {
  likes: LikeType[];
  item_id: number;
}
const Like: React.FC<LikeProps> = ({ item_id, likes }) => {
  const user = useAppSelector((state) => state.userSlice!);
  const dispatch = useAppDispatch();
  const isLiked = likes.findIndex((like) => like.user_id === user.id) !== -1;
  const handleLikeClick = async () => {
    if (user.id != -1) {
      await Api().setLike({ item_id, user_id: user.id });
      dispatch(setLike({ user_id: user.id, type: isLiked ? "remove" : "add" }));
    }
  };

  return (
    <IconSpan
      onClick={handleLikeClick}
      className="cursor-pointer"
      iconClassName={"text-black text-3xl"}
      textClassName={"text-black text-3xl"}
      icon={isLiked ? HeartFill : Heart}
      text={likes.length.toString()}
    />
  );
};

export default Like;
