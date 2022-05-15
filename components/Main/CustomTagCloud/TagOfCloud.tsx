import Link from "next/link";

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

export default TagOfCloud;
