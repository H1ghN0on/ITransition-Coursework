import dynamic from "next/dynamic";

const Markdown = dynamic(
  () => import("@uiw/react-markdown-preview"!).then((mod) => mod.default),
  { ssr: false }
) as any;

const TextCell = ({ value }: any) => (
  <div className="align-left">
    <Markdown source={value} />
  </div>
);

export default TextCell;
