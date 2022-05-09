import { Toolbar, ProfileBrief, IconSpan } from "@components/Common";
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

interface ProfileProps {
  profileId: number;
}

const Profile: NextPage<ProfileProps> = ({ profileId }) => {
  const collectionsData = useAppSelector((state) => state.collectionsSlice);
  const user = useAppSelector((state) => state.userSlice);
  const isEditable = user && user.id == profileId;
  const dispatch = useAppDispatch();

  const intl = useIntl();
  const addCollectionIntl = intl.formatMessage({ id: "add_collection" });

  const handleAddClick = () => {
    dispatch(setModal(true));
  };

  return (
    <>
      {isEditable && collectionsData.isModalActive && (
        <AddCollectionModal
          closeModal={() => {
            dispatch(setModal(false));
          }}
        />
      )}
      <div className="flex justify-center w-full pt-[2vh] md:pt-[10vh]">
        <div className="flex flex-col items-center w-screen  space-y-3">
          <div className="flex flex-col items-center md:flex-row space-y-5 md:space-y-0 w-2/3 justify-between mb-10">
            <ProfileBrief imageSrc={"/avatar.jpg"} name="H1ghN0on_" />
            <Toolbar />
          </div>
          {isEditable && (
            <div
              onClick={handleAddClick}
              className="flex justify-center items-center bg-white rounded shadow-inner-md py-5 w-2/3 cursor-pointer"
            >
              <div className="flex">
                <IconSpan
                  iconClassName="text-black font-bold text-xl md:text-3xl "
                  textClassName="text-black font-bold text-base md:text-xl"
                  text={addCollectionIntl}
                  icon={Plus}
                />
              </div>
            </div>
          )}
          <List
            items={collectionsData.collections}
            type="collection"
            className="flex flex-col w-2/3"
          />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    await checkUserAuth(store, ctx);

    const collections = await Api(ctx).getUserCollections(+ctx.query.id!);

    store.dispatch(setCollections(collections));
    return {
      props: { profileId: ctx.query.id }, // will be passed to the page component as props
    };
  }
);

export default Profile;
