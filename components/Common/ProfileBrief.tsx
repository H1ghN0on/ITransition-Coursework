import React from "react";

interface ProfileBriefProps {
  name: string;
  imageSrc: string;
}

const ProfileBrief: React.FC<ProfileBriefProps> = ({ name, imageSrc }) => {
  return (
    <div className="flex items-center">
      <div>
        <img
          className="w-[50px] h-[50px] rounded-full"
          src={imageSrc}
          alt="avatar"
        />
      </div>
      <span className="ml-2 font-bold text-black text-base md:text-lg">
        {name}
      </span>
    </div>
  );
};

export default ProfileBrief;
