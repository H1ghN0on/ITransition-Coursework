import { Api } from "@api";
import { Toolbar, Wrapper } from "@components/Common";
import { CustomTagCloud, List } from "@components/Main";
import { useComponentWillMount } from "@hooks";
import { useAppDispatch, wrapper } from "@redux/store";
import { clearUser, setUser } from "@redux/userSlice";
import { CollectionItemType, CollectionType, UserType } from "@types";
import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { useIntl } from "react-intl";

interface MainProps {
  items: CollectionItemType[];
  collections: CollectionType[];
  tags: any[];
  user: UserType;
}

const Main: NextPage<MainProps> = ({ user, collections, tags, items }) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const recentlyAddedIntl = intl.formatMessage({ id: "recently_added" });

  useComponentWillMount(() => {
    dispatch(user ? setUser(user) : clearUser());
  });

  return (
    <Wrapper>
      <div className="flex flex-col items-center  md:w-[80vw]">
        <div className="md:self-end mb-10 px-5">
          <Toolbar />
        </div>
        <div>
          <CustomTagCloud tags={tags} />
        </div>
        <div className="flex flex-col md:flex-row space-y-[50px] md-space-x-0 xs:md:space-x-5 md:space-y-0 ">
          <List
            className="flex flex-col w-screen xs:w-full md:w-2/3 relative"
            type="collection"
            items={collections}
            editable={false}
          />

          <List
            className="flex flex-col w-screen xs:w-full md:w-1/3 relative"
            type="added-item"
            items={items}
            title={recentlyAddedIntl}
            editable={false}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Main;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const user = await Api(ctx).getMe();
  const collections = await Api(ctx).getTopCollections();
  const { tags } = await Api(ctx).countTags();
  const { items } = await Api(ctx).getLastAdded();
  return {
    props: { user, collections, items, tags },
  };
};
