import Link from "next/link";
import React from "react";

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <Link href={{ pathname: "/search", query: { tag: encodeURI(text) } }}>
      <a>
        <div className="text-xs rounded-full mt-3 mr-3 px-3 py-1 border-2 shadow-inner-md">
          {text}
        </div>
      </a>
    </Link>
  );
};

export default Tag;
