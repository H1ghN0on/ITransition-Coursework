import { Comments } from "@components/Comments";
import { ProfileBrief, Toolbar } from "@components/Common";
import { Info } from "@components/Item";
import { NextPage } from "next";
import React from "react";

const ItemInfo: NextPage = () => {
  return (
    <div className="flex justify-center w-full pt-[2vh] md:pt-[10vh]">
      <div className="flex flex-col items-center w-screen space-y-3">
        <div className="flex flex-col items-center md:flex-row space-y-5 md:space-y-0 w-2/3 justify-between mb-10">
          <ProfileBrief imageSrc={"/avatar.jpg"} name="H1ghN0on_" />
          <Toolbar />
        </div>
        <div className="w-4/5 md:w-2/3 flex space-y-2 flex-col bg-white rounded shadow-inner md:px-5">
          <Info />
          <Comments />
        </div>
      </div>
    </div>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (ctx: GetServerSidePropsContext) => {
//     await checkUserAuth(store, ctx);
//     const { collection } = await Api(ctx).getCollectionById(+ctx.query.id!);
//     const { items, columns } = await Api(ctx).getCollectionData(+ctx.query.id!);
//     store.dispatch(setCollection(collection));
//     return {
//       props: {
//         items,
//         columns: columns.map((obj: any) => ({
//           ...obj,
//           minWidth: 250,
//           width: 10 * obj.name.length,
//         })),
//       }, // will be passed to the page component as props
//     };
//   }
// );

export default ItemInfo;
