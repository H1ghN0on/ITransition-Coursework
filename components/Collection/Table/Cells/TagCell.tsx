import { Tag } from "@components/Common";

const TagCell = ({ value }: any) => (
  <div className="overflow-y-auto flex flex-wrap space-y-1">
    <div className="hidden"></div>
    {value &&
      value.map((tag: string, index: number) => <Tag text={tag} key={index} />)}
  </div>
);

export default TagCell;
