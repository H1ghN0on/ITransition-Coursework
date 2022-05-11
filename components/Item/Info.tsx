import { Api } from "@api";
import { IconSpan, Tag } from "@components/Common";
import { Head, InfoBar, PropertyList, TagList } from "@components/Item";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setLike } from "@redux/itemSlice";
import React from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";

const Info = () => {
  const dispatch = useAppDispatch();

  const { id, name, tags, createdAt, belongsTo, info, likes } = useAppSelector(
    (state) => state.itemSlice.item!
  );

  const user = useAppSelector((state) => state.userSlice!);
  const isLiked = likes.findIndex((like) => like.user_id === user.id) !== -1;

  const handleLikeClick = async () => {
    await Api().setLike({ item_id: id, user_id: user.id });
    dispatch(setLike({ user_id: user.id, type: isLiked ? "remove" : "add" }));
  };

  return (
    <div className="flex flex-col md:justify-between  md:flex-row w-full ">
      <div className="flex flex-col justify-center md:ml-2 space-y-4 md:w-3/4 text-left p-5">
        <Head from={belongsTo.toString()} name={name} />

        <PropertyList
          properties={info.map((property) => ({
            field: property.name,
            value: property.value,
          }))}
        />

        <div className="flex justify-center md:justify-start flex-wrap max-w-[60vw] gap-1">
          <TagList tags={tags} />
        </div>
        <InfoBar date={createdAt} id={id} position="start" editable={false} />
      </div>

      <div className="w-full flex justify-center md:w-1/5 self-center ">
        <IconSpan
          onClick={handleLikeClick}
          className="cursor-pointer"
          iconClassName={"text-black text-3xl"}
          textClassName={"text-black text-3xl"}
          icon={isLiked ? HeartFill : Heart}
          text={likes.length.toString()}
        />
      </div>
    </div>
  );
};

export default Info;
