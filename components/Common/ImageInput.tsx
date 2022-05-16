import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useHasMounted } from "@hooks";
import Dropzone from "react-dropzone";
import IconSpan from "./IconSpan";
import { CloudArrowUp } from "react-bootstrap-icons";

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
  onChange: (file: FileList | File[]) => void;
  rounded?: boolean;
  name?: string;
  initSrc?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  imgClassName,
  width,
  height,
  label,
  onChange,
  rounded,
  name,
  initSrc,
}) => {
  const [src, setSrc] = React.useState<string>(initSrc ?? "/Vladimir.jpg");
  const isMounted = useHasMounted();

  if (!isMounted) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files;
      onChange(file);
      if (file) {
        const img = URL.createObjectURL(file[0]);
        setSrc(img);
      }
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles;
    onChange(acceptedFiles);
    if (file) {
      const img = URL.createObjectURL(file[0]);
      setSrc(img);
    }
  };

  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div {...getRootProps()}>
          {isDragActive ? (
            <AvatarLabel
              className="flex flex-col justify-center items-center"
              htmlFor="upload"
            >
              <img
                width={width}
                height={height}
                className={rounded ? "rounded-full" : "" + " opacity-20"}
                src={src}
                alt="avatar"
              />
              <Sign>
                <span className="text-xs md:text-base text-center">
                  Drop here
                </span>
              </Sign>
            </AvatarLabel>
          ) : (
            <>
              <AvatarLabel
                className="flex flex-col justify-center items-center"
                htmlFor="upload"
              >
                <div className={imgClassName}>
                  <img
                    width={width}
                    height={height}
                    className={rounded ? "rounded-full" : ""}
                    src={src}
                    alt="avatar"
                  />
                </div>
                <Sign>
                  <span className="text-xs md:text-base text-center">
                    {label}
                  </span>
                </Sign>
              </AvatarLabel>

              <Upload
                {...getInputProps()}
                onChange={handleChange}
                id="upload"
                type="file"
                name={name}
              />
            </>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default ImageInput;
