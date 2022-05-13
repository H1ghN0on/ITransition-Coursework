import { Api } from "@api";
import { Tag, Toolbar } from "@components/Common";
import { List } from "@components/Main";
import { wrapper } from "@redux/store";
import { CollectionType } from "@types";
import { checkUserAuth } from "@utils";
import type { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useIntl } from "react-intl";
import { TagCloud } from "react-tagcloud";

interface MainProps {
  collections: CollectionType[];
  tags: any[];
}

const TagOfCloud = (tag: any, size: number, color: string) => {
  return (
    <Link href={{ pathname: "/search", query: { tag: encodeURI(tag.value) } }}>
      <a>
        <span
          key={tag.value}
          style={{
            fontSize: `${size / 5}em`,
            color,
            display: "inline-block",
            margin: "3px",
            padding: "3px",
          }}
        >
          {tag.value}
        </span>
      </a>
    </Link>
  );
};

const Main: NextPage<MainProps> = ({ collections, tags }) => {
  const intl = useIntl();
  const recentlyAddedIntl = intl.formatMessage({ id: "recently_added" });

  return (
    <div className="flex justify-center w-full pt-[2vh] md:pt-[10vh]">
      <div className="flex flex-col items-center ">
        <div className="md:self-end mb-10  px-5">
          <Toolbar />
        </div>
        <div className="w-[50vw] ">
          <TagCloud
            minSize={5}
            maxSize={12}
            tags={tags}
            renderer={TagOfCloud}
            colorOptions={{ luminosity: "dark", hue: "green" }}
            className="text-center bg-white mb-10 py-5 px-[20%] rounded-full"
            onClick={(tag: any) => alert(`'${tag.value}' was selected!`)}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-[50px] md-space-x-0 xs:md:space-x-5 md:space-y-0 ">
          <List
            className="flex flex-col w-screen xs:w-full md:w-2/3 relative"
            type="collection"
            items={collections}
          />
          {/* <List
            className="flex flex-col w-screen xs:w-full md:w-1/3 relative"
            type="item"
            title={recentlyAddedIntl}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Main;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    await checkUserAuth(store, ctx);
    const collections = await Api(ctx).getTopCollections();
    const { tags } = await Api(ctx).countTags();

    return {
      props: { collections, tags }, // will be passed to the page component as props
    };
  }
);
