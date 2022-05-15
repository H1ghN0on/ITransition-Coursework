import { Api } from "@api";
import { Info, ItemTable } from "@components/Collection";
import { CollectionType, ColumnData } from "@types";
import { ProfileBrief, Toolbar, Wrapper } from "@components/Common";
import { setCollection } from "@redux/collectionSlice";
import { wrapper } from "@redux/store";
import { CollectionItemType } from "@types";
import { checkUserAuth } from "@utils";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { useAppSelector } from "@redux/hooks";

interface CollectionInfoProps {
  collection: CollectionType;
  items: CollectionItemType[];
  columns: ColumnData[];
}

const CollectionInfo: NextPage<CollectionInfoProps> = ({
  collection,
  items,
  columns,
}) => {
  const user = useAppSelector((state) => state.userSlice);

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
              editable={user.id === collection.belongsTo.id}
              additiveColumns={columns}
              initItems={items}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    await checkUserAuth(store, ctx);
    const { collection } = await Api(ctx).getCollectionById(+ctx.query.id!);
    const { items, columns } = await Api(ctx).getCollectionData(+ctx.query.id!);

    store.dispatch(setCollection(collection));
    return {
      props: {
        collection,
        items,
        columns: columns.map((obj: any) => ({
          ...obj,
          minWidth: 250,
          width: 10 * obj.name.length,
        })),
      }, // will be passed to the page component as props
    };
  }
);

export default CollectionInfo;
