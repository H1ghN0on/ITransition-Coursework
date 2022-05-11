import { Input } from "@components/Common";
import React from "react";

const Head = () => {
  const [value, setValue] = React.useState<string>("");

  return (
    <div className="py-3">
      <h3 className="text-black text-2xl font-bold mb-3">3 Comments</h3>
      <Input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="h-5 rounded-full text-sm w-[50%] max-w-[100%]"
        value={value}
        name="comment"
        type="text"
        label="Write your comment"
        placeholder="Your comment..."
      />
    </div>
  );
};

export default Head;
