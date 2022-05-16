import Link from "next/link";
import React from "react";
import { SlashSquare } from "react-bootstrap-icons";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/">
      <a>
        <SlashSquare
          className={"text-black text-xl dark:text-white " + className}
        />
      </a>
    </Link>
  );
};

export default Logo;
