import { Api } from "@api";
import { CustomDropdown, Input, Toolbar } from "@components/Common";
import Dropdown from "@components/Common/Dropdown";
import { List } from "@components/Main";
import { wrapper } from "@redux/store";
import { CollectionItemType } from "@types";
import { checkUserAuth } from "@utils";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";

const types = [
  { label: "Tags", value: "tag" },
  { label: "Values", value: "value" },
];

interface SearchProps {
  initValue?: string;
  initItems?: CollectionItemType[];
  initType?: "tag" | "value";
}

const Search: NextPage<SearchProps> = ({ initValue, initItems, initType }) => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [type, setType] = React.useState<"tag" | "value">(initType ?? "value");
  const [value, setValue] = React.useState<string>(initValue ?? "");
  const [items, setItems] = React.useState<CollectionItemType[] | null>(
    initItems ?? null
  );

  const handleSubmitClick = async () => {
    if (value != "") {
      setLoading(true);
      switch (type) {
        case "value": {
          const { items } = await Api().search(value);
          setItems(items);
          break;
        }
        case "tag": {
          const { items } = await Api().searchByTag(value);
          setItems(items);
          break;
        }
      }

      setLoading(false);
    }
  };

  const handleDropdownChange = (option: any) => {
    setType(option.value);
  };

  const Items = () => {
    if (!items) {
      return (
        <div className="flex items-center">
          <img className="w-[100px] h-[100px]" src="no.jpg" alt="no" />
          <span className="ml-3 text-xl text-black font-bold">No items?</span>
        </div>
      );
    }
    if (items.length == 0) {
      return (
        <div className="flex items-center">
          <img className="w-[100px] h-[100px]" src="no.jpg" alt="no" />
          <span className="ml-3 text-xl text-black font-bold">No items?</span>
        </div>
      );
    }
    return (
      <div className=" w-[50vw]">
        <List type="search-item" items={items} />
      </div>
    );
  };

  return (
    <div className="flex justify-center w-full pt-[2vh] md:pt-[10vh]">
      <div className="flex flex-col items-center w-screen space-y-3">
        <div className="flex flex-col items-center md:flex-row space-y-5 md:space-y-0 w-2/3 justify-end mb-10">
          <Toolbar />
        </div>
        <div className="flex justify-center w-[50vw] items-center">
          <CustomDropdown
            label="Type"
            list={types}
            name="type"
            onChange={handleDropdownChange}
            defaultValue={type}
          />
          <Input
            label="Search"
            name="search"
            iconBtn
            className="ml-3 w-full h-[30px]"
            value={value}
            placeholder="Enter something here..."
            iconClassName="ml-3 cursor-pointer"
            onIconClick={handleSubmitClick}
            loading={isLoading}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
            type="text"
          />
        </div>

        <Items />
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
    await checkUserAuth(store, ctx);
    if (ctx.query.tag) {
      const value = decodeURI(ctx.query.tag as string);
      const { items } = await Api().searchByTag(ctx.query.tag as string);
      return {
        props: {
          initValue: value,
          initItems: items,
          initType: "tag",
        },
      };
    }
    return {
      props: {}, // will be passed to the page component as props
    };
  }
);

export default Search;
