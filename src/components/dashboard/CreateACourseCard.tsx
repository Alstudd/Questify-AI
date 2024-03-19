"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Lightbulb } from "lucide-react";

type Props = {};

const QuizMeCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75 col-span-4"
      onClick={() => {
        router.push("/create");
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Create A Course!</CardTitle>
        <Lightbulb size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
            Create a course with your own topics with just one click.
        </p>
      </CardContent>
    </Card>
  );
};

export default QuizMeCard;