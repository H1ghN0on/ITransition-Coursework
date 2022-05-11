import { Head, Comment } from "@components/Comments";
import React from "react";

const Comments = () => {
  return (
    <div className="flex flex-col p-5 space-y-3">
      <Head />
      <div className="space-y-3">
        <Comment
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem hic sequi perspiciatis error earum ut dicta, unde sunt libero impedit iste quibusdam enim est aperiam iure sit animi adipisci veniam voluptatem temporibus, nisi consequatur ratione? Molestiae repudiandae fugiat iste cumque labore placeat illum quis consequuntur culpa eum, amet quaerat provident praesentium, beatae nihil. Velit quis quos tenetur amet ex eos animi labore dolorem veritatis, molestias saepe sapiente et illum nemo consequatur aut deleniti voluptatibus a adipisci officiis reprehenderit? Dolor iusto possimus quae quaerat sapiente error officiis eaque soluta? Quo sint quam aperiam fuga voluptatibus dicta accusantium consequuntur dolore repellendus rerum."
          owner="Masekoi"
          date="11.05.2022"
        />
        <Comment
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          owner="Masekoi"
          date="11.05.2022"
        />
      </div>
    </div>
  );
};

export default Comments;
