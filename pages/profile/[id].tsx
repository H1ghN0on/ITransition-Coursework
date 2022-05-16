import { Toolbar, ProfileBrief, IconSpan, Wrapper } from "@components/Common";
import { List } from "@components/Main";
import { GetServerSidePropsContext, NextPage } from "next";
import { Plus } from "react-bootstrap-icons";
import React from "react";
import { useIntl } from "react-intl";
import { AddCollectionModal } from "@components/Profile";
import { useAppDispatch, wrapper } from "@redux/store";
import { checkUserAuth } from "@utils";
import { Api } from "@api";

import { setCollections, setModal } from "@redux/collectionsSlice";
import { useAppSelector } from "@redux/hooks";
import AddCollectionButton from "@components/Profile/AddCollectionButton";
import { CollectionType, UserType } from "@types";
import { clearUser, setUser } from "@redux/userSlice";
import { useComponentWillMount } from "@hooks";

interface ProfileProps {
  initUser: UserType;
  collections: CollectionType[];
  profile: UserType;
}

const Profile: NextPage<ProfileProps> = ({
  initUser,
  collections,
  profile,
}) => {
  const collectionsData = useAppSelector((state) => state.collectionsSlice);
  const user = useAppSelector((state) => state.userSlice);
  const isEditable = (user && user.id == profile.id) || user.status === "admin";
  const dispatch = useAppDispatch();

  useComponentWillMount(() => {
    dispatch(setCollections(collections));
    dispatch(initUser ? setUser(initUser) : clearUser());
  });

  return (
    <>
      {isEditable && collectionsData.isModalActive && (
        <AddCollectionModal
          closeModal={() => {
            dispatch(setModal(false));
          }}
        />
      )}
      <Wrapper>
        <div className="flex flex-col items-center w-screen  space-y-3">
          <div className="flex flex-col items-center md:flex-row space-y-5 md:space-y-0 w-2/3 justify-between mb-10">
            <ProfileBrief
              imageSrc={profile.avatarURL}
              name={profile.username}
            />
            <Toolbar />
          </div>
          <AddCollectionButton editable={isEditable} />
          <List
            editable={true}
            items={collectionsData.collections}
            type="collection"
            className="flex flex-col w-2/3"
          />
        </div>
      </Wrapper>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const initUser = await Api(ctx).getMe();
  const collections = await Api(ctx).getUserCollections(+ctx.query.id!);
  const { user } = await Api(ctx).getUser(+ctx.query.id!);

  return {
    props: { initUser, collections, profile: user },
  };
};

export default Profile;
