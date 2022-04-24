import { Toolbar, ProfileBrief, IconSpan } from "@components/Common";
import { List } from "@components/Main";
import { NextPage } from "next";
import { Plus } from "react-bootstrap-icons";
import React from "react";
import { useIntl } from "react-intl";
import { AddCollectionModal } from "@components/Profile";

const Profile: NextPage = () => {
  const intl = useIntl();
  const addCollectionIntl = intl.formatMessage({ id: "add_collection" });

  const [isModalActive, setModalActive] = React.useState<boolean>(false);

  const handleAddClick = () => {
    setModalActive(true);
  };

  return (
    <>
      {isModalActive && (
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
          <List type="collection" className="flex flex-col w-2/3" />
        </div>
      </div>
    </>
  );
};

export default Profile;
