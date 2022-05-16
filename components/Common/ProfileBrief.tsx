import React from "react";
interface ProfileBriefProps {
  name: string;
  imageSrc: string;
}

const ProfileBrief: React.FC<ProfileBriefProps> = ({ name, imageSrc }) => {
  return (
    <div className="flex items-center">
      <img
        className="w-[50px] h-[50px] rounded-full"
        src={imageSrc}
        alt="avatar"
      />

      <span className="ml-2 font-bold text-black text-base md:text-lg  dark:text-white">
        {name}
      </span>
    </div>
  );
};

export default ProfileBrief;
