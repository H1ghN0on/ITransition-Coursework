import { Api } from "@api";
import { Info, ItemTable } from "@components/Collection";
import { CollectionType, ColumnData, UserType } from "@types";
import { ProfileBrief, Toolbar, Wrapper } from "@components/Common";
import { setCollection } from "@redux/collectionSlice";
import { wrapper } from "@redux/store";
import { CollectionItemType } from "@types";
import { checkUserAuth } from "@utils";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useComponentWillMount } from "@hooks";
import { clearUser, setUser } from "@redux/userSlice";

interface CollectionInfoProps {
  collection: CollectionType;
  items: CollectionItemType[];
  columns: ColumnData[];
  initUser: UserType | null;
}

const CollectionInfo: NextPage<CollectionInfoProps> = ({
  collection,
  items,
  columns,
  initUser,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);

  useComponentWillMount(() => {
    dispatch(initUser ? setUser(initUser) : clearUser());
    dispatch(setCollection(collection));
  });

  return (
    <Wrapper>
      <div className="flex flex-col items-center w-screen  space-y-3">
        <div className="flex flex-col items-center md:flex-row space-y-5 md:space-y-0 w-2/3 justify-between mb-10">
          <ProfileBrief imageSrc={"/avatar.jpg"} name="H1ghN0on_" />
          <Toolbar />
        </div>
        <div className="w-4/5 md:w-2/3 flex flex-col bg-white rounded shadow-inner md:px-5 truncate  ">
          <div>
            <Info />
          </div>
          <div className="mt-3">
            <ItemTable
              editable={
                user.id === collection.belongsTo.id || user.status === "admin"
              }
              additiveColumns={columns}
              initItems={items}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const initUser = await Api(ctx).getMe();
  const { collection } = await Api(ctx).getCollectionById(+ctx.query.id!);
  const { items, columns } = await Api(ctx).getCollectionData(+ctx.query.id!);
  return {
    props: {
      initUser,
      collection,
      items,
      columns: columns.map((obj: any) => ({
        ...obj,
        minWidth: 250,
        width: 10 * obj.name.length,
      })),
    }, // will be passed to the page component as props
  };
};

export default CollectionInfo;
