import { formatDate } from "@utils";
import React from "react";

interface CommentProps {
  text: string;
  owner: string;
  date: string;
}

const Comment: React.FC<CommentProps> = ({ owner, text, date }) => {
  return (
    <div className="flex w-[100%] space-x-3 items-center">
      <div className="flex w-[5%] h-[5%] self-start">
        <img className="rounded-full" src="/Vladimir.jpg" alt="avatar"></img>
      </div>
      <div className="flex space-y-1 justify-center flex-col w-[95%]">
        <div className="flex w-[100%] space-x-2">
          <div className="flex space-y-1 justify-center flex-col w-[95%] ">
            <div className="flex justify-between dark:text-white">
              <span>{owner}</span>
              <span>{formatDate(date)}</span>
            </div>

            <p className="text-black dark:text-white text-justify">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
