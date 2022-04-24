import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useHasMounted } from "@hooks";

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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rounded?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  imgClassName,
  width,
  height,
  label,
  onChange,
  rounded,
}) => {
  const [src, setSrc] = React.useState<string>("/Skittle.jpg");
  const isMounted = useHasMounted();

  if (!isMounted) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (e.target.files) {
      const img = URL.createObjectURL(e.target.files[0]);
      setSrc(img);
    }
  };

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
            className={rounded ? "rounded-full" : ""}
            src={src}
            alt="avatar"
          />
        </div>
        <Sign>
          <span className="text-xs md:text-base text-center">{label}</span>
        </Sign>
      </AvatarLabel>
      <Upload onChange={handleChange} id="upload" type="file" name="avatar" />
    </div>
  );
};

export default ImageInput;
