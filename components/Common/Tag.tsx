import Link from "next/link";
import React from "react";

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <Link href={{ pathname: "/search", query: { tag: encodeURI(text) } }}>
      <a>
        <div className="text-xs rounded-full mr-3 px-3 py-1 border-2 dark:border-[#3F3351] dark:text-white shadow-inner-md dark:bg-[#712B75]">
          {text}
        </div>
      </a>
    </Link>
  );
};

export default Tag;
