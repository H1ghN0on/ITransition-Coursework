import React from "react";
import { SubmitButton, SubmitButtonText } from "@styles/components";
import { ThemeProvider } from "styled-components";
import { useHasMounted } from "@hooks";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  background?: string;
  color?: string;
  icon?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  background,
  color,
  className,
  icon,
  disabled,
}) => {
  const isMounted = useHasMounted();

  if (!isMounted) {
    return null;
  }

  const theme = {
    bg: background ?? "#ffc700",
    color: color ?? "white",
  };

  return (
    <ThemeProvider theme={theme}>
      <SubmitButton
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          `px-[50px] py-[10px] md:px-[80px] md:py-[15px] rounded-full ${className}`
        )}
      >
        <SubmitButtonText
          className={clsx(
            "font-bold uppercase text-xs md:text-base lg:text-lg",
            {
              ["flex justify-center items-center"]: icon,
            }
          )}
        >
          {children}
        </SubmitButtonText>
      </SubmitButton>
    </ThemeProvider>
  );
};

export default Button;
