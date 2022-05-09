import { Toolbar, ProfileBrief, IconSpan } from "@components/Common";
import { List } from "@components/Main";
import { GetServerSidePropsContext, NextPage } from "next";
import { Plus } from "react-bootstrap-icons";
import React from "react";
import { useIntl } from "react-intl";
import { AddCollectionModal } from "@components/Profile";
import { wrapper } from "@redux/store";
import { checkUserAuth } from "@utils";
import { Api } from "@api";
import { CollectionType } from "@types";

interface ProfileProps {
  isEditable: boolean;
  collections: CollectionType[];
}

const Profile: NextPage<ProfileProps> = ({ isEditable, collections }) => {
  console.log(collections);
  const intl = useIntl();
  const addCollectionIntl = intl.formatMessage({ id: "add_collection" });

  const [isModalActive, setModalActive] = React.useState<boolean>(false);

  const handleAddClick = () => {
    setModalActive(true);
  };

  return (
    <>
      {isEditable && isModalActive && (
        <AddCollectionModal
          closeModal={() => {
            setModalActive(false);
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
            items={collections}
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
    const user = await checkUserAuth(store, ctx);

    const isEditable = user && user.id == ctx.query.id;
    const collections = await Api(ctx).getUserCollections(+ctx.query.id!);

    return {
      props: { isEditable, collections }, // will be passed to the page component as props
    };
  }
);

export default Profile;
