import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface CardWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function CardWrapper({
  title,
  description,
  children,
}: CardWrapperProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-bold">
          {title}
        </CardTitle>
        <CardDescription className="text-xs text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
