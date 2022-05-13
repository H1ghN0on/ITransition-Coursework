import { Api } from "@api";
import { Input, Toolbar } from "@components/Common";
import { List } from "@components/Main";
import { CollectionItemType } from "@types";
import { NextPage } from "next";
import React from "react";

const Search: NextPage = () => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [items, setItems] = React.useState<CollectionItemType[] | null>(null);

  const handleSubmitClick = async () => {
    if (value != "") {
      setLoading(true);
      const { items } = await Api().search(value);
      setLoading(false);
      setItems(items);
    }
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
        <div className="flex justify-center w-[50vw]">
          <Input
            label="Search"
            name="search"
            iconBtn
            className="w-full h-[30px]"
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

export default Search;
