import { Api } from "@api";
import { CustomDropdown, Input, Toolbar, Wrapper } from "@components/Common";
import { Result } from "@components/Search";
import { useComponentWillMount } from "@hooks";
import { useAppDispatch } from "@redux/hooks";
import { clearUser, setUser } from "@redux/userSlice";
import { CollectionItemType, UserType } from "@types";
import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { useIntl } from "react-intl";

interface SearchProps {
  initValue?: string;
  initItems?: CollectionItemType[];
  initType?: "tag" | "value";
  user: UserType | null;
}

const Search: NextPage<SearchProps> = ({
  user,
  initValue,
  initItems,
  initType,
}) => {
  const intl = useIntl();
  const tagsIntl = intl.formatMessage({ id: "item_tags" });
  const typeIntl = intl.formatMessage({ id: "type" });
  const valuesIntl = intl.formatMessage({ id: "values" });
  const searchIntl = intl.formatMessage({ id: "search" });
  const enterSomethingHereIntl = intl.formatMessage({
    id: "enter_somethine_here",
  });

  const types = [
    { label: tagsIntl, value: "tag" },
    { label: valuesIntl, value: "value" },
  ];

  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [type, setType] = React.useState<"tag" | "value">(initType ?? "value");
  const [value, setValue] = React.useState<string>(initValue ?? "");
  const [items, setItems] = React.useState<CollectionItemType[] | null>(
    initItems ?? null
  );

  useComponentWillMount(() => {
    dispatch(user ? setUser(user) : clearUser());
  });

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

  return (
    <Wrapper>
      <div className="flex flex-col items-center w-screen space-y-3">
        <div className="flex flex-col items-center md:flex-row space-y-5 md:space-y-0 w-2/3 justify-end mb-10">
          <Toolbar />
        </div>
        <div className="flex justify-center w-[50vw] items-center">
          <CustomDropdown
            label={typeIntl}
            list={types}
            name="type"
            onChange={handleDropdownChange}
            defaultValue={valuesIntl}
          />
          <Input
            label={searchIntl}
            name="search"
            iconBtn
            className="ml-3 w-full h-[30px]"
            value={value}
            placeholder={enterSomethingHereIntl}
            iconClassName="ml-3 cursor-pointer"
            onIconClick={handleSubmitClick}
            loading={isLoading}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
            type="text"
          />
        </div>

        <Result items={items} />
      </div>
    </Wrapper>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const user = await Api(ctx).getMe();
  if (ctx.query.tag) {
    const value = decodeURI(ctx.query.tag as string);
    const { items } = await Api(ctx).searchByTag(ctx.query.tag as string);
    return {
      props: {
        user,
        initValue: value,
        initItems: items,
        initType: "tag",
      },
    };
  }
  return {
    props: { user }, // will be passed to the page component as props
  };
};

export default Search;
