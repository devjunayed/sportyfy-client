import React, { ReactNode } from "react";
import { Button } from "@heroui/button";
import Link from "next/link";

type SButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "submit" | "link" | "button";
  className?: string
};

const SButton = ({ children, onClick, href, className, type = "button" }: SButtonProps) => {
  if (type === "link" && href) {
    return (
      <Link href={href}>
        <Button
          as="a"
          className={`${className}`}
        >
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      type={type === "submit" ? "submit" : "button"}
      onPress={onClick}
      className={`${className} `}
    >
      {children}
    </Button>
  );
};

export default SButton;
