import React from "react";
import Image from "next/image";
import styled from "styled-components";

const AvatarLabel = styled.label`
  cursor: pointer;
`;

const Upload = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
  width: 0;
`;

const Sign = styled.div`
  color: #7c7c7c;
`;

interface ImageInputProps {
  imgClassName?: string;
  width: number;
  height: number;
  label?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  imgClassName,
  width,
  height,
  label,
}) => {
  return (
    <div>
      <AvatarLabel
        className="flex flex-col justify-center items-center"
        htmlFor="upload"
      >
        <div className={imgClassName}>
          <Image
            width={width}
            height={height}
            className={`rounded-full`}
            src="/Skittle.jpg"
            alt="avatar"
          />
        </div>
        <Sign>
          <span className="text-xs md:text-base">{label}</span>
        </Sign>
      </AvatarLabel>
      <Upload id="upload" type="file" name="avatar" />
    </div>
  );
};

export default ImageInput;
