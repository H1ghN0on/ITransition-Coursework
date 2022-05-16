import { Api } from "@api";
import { Comments } from "@components/Comments";
import { ProfileBrief, Toolbar, Wrapper } from "@components/Common";
import { Info } from "@components/Item";
import { addComment, setItem } from "@redux/itemSlice";
import { useAppDispatch, wrapper } from "@redux/store";
import { checkUserAuth } from "@utils";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import socket from "@core/socket";
import { useRouter } from "next/router";
import { CollectionItemType, CommentType, UserType } from "@types";
import { clearUser, setUser } from "@redux/userSlice";
import { useComponentWillMount } from "@hooks";

interface ItemInfoProps {
  item: CollectionItemType;
  comments: CommentType[];
  user: UserType;
}

const ItemInfo: NextPage<ItemInfoProps> = ({ user, item, comments }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useComponentWillMount(() => {
    dispatch(user ? setUser(user) : clearUser());
    dispatch(setItem({ item, comments }));
  });

  React.useEffect(() => {
    socket.emit("connected-to-item", router.query.id);
    socket.on("new-comment", (comment: any) => {
      dispatch(
        addComment({
          comment: comment.comment.comment,
          user: comment.comment.user,
        })
      );
    });
    return () => {
      socket.emit("disconnected", router.query.id);
    };
  }, [router.query.id, dispatch]);

  return (
    <Wrapper>
      <div className="flex flex-col items-center w-screen space-y-3">
        <div className="flex flex-col items-center md:flex-row space-y-5 md:space-y-0 w-2/3 justify-between mb-10">
          <Toolbar />
        </div>

        <div className="w-4/5 md:w-2/3 flex space-y-2 flex-col bg-white rounded shadow-inner md:px-5 dark:bg-[#3F3351]">
          <Info />
          <Comments />
        </div>
      </div>
    </Wrapper>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const user = await Api(ctx).getMe();

  const { item } = await Api(ctx).getItemById(+ctx.query.id!);
  if (!item) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const { comments } = await Api(ctx).getItemComments(+ctx.query.id!);

  return { props: { item, comments, user } };
};

export default ItemInfo;
