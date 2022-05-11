import { Api } from "@api";
import { Info, ItemTable } from "@components/Collection";
import { ColumnData } from "@components/Collection/Table/THeader";
import { ProfileBrief, Toolbar } from "@components/Common";
import { setCollection } from "@redux/collectionSlice";
import { wrapper } from "@redux/store";
import { CollectionItemType, ItemAdditiveType } from "@types";
import { checkUserAuth } from "@utils";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";

interface CollectionInfoProps {
  items: CollectionItemType[];
  columns: ColumnData[];
}

const CollectionInfo: NextPage<CollectionInfoProps> = ({ items, columns }) => {
  return (
    <div className="flex justify-center w-full pt-[2vh] md:pt-[10vh]">
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
            <ItemTable additiveColumns={columns} initItems={items} />
          </div>
        </div>
      </div>
    </div>
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
