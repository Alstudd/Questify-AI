"use client";
import React, { useState } from 'react'
import { Game, Question } from "@prisma/client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { BarChart, ChevronRight, Loader2, Timer } from 'lucide-react';
import MCQCounter from './MCQCounter';
import { checkAnswerSchema, endGameSchema } from '@/schemas/forms/quiz';
import { useToast } from './ui/use-toast';
import { cn, formatTimeDelta } from '@/lib/utils';
import { differenceInSeconds } from "date-fns";
import BlankAnswerInput from './BlankAnswerInput';

type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

const OpenEnded = ({ game }: Props) => {
  const [blankAnswer, setBlankAnswer] = useState<string>('')
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasEnded, setHasEnded] = React.useState<boolean>(false);
  const [now, setNow] = React.useState<Date>(new Date());
  const { toast } = useToast();

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) setNow(new Date())
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [hasEnded])

  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post("/api/endGame", payload);
      return response.data;
    },
  });

  const { mutate: checkAnswer } = useMutation({
    mutationFn: async () => {
      setIsLoading(true)
      let filledAnswer = blankAnswer
      document.querySelectorAll('#user-blank-input').forEach((input: Element) => {
        const inputValue = (input as HTMLInputElement).value;
        filledAnswer = filledAnswer.replace("_____", inputValue);
        (input as HTMLInputElement).value = '';
      });
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: filledAnswer,
      };
      const response = await axios.post("/api/checkAnswer", payload);
      setIsLoading(false);
      return response.data;
    },
  });

  const handleNext = React.useCallback(() => {
    if (isLoading) return;
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast({
          title: `Your answer is ${percentageSimilar}% similar to the answer`,
          description: "Answers are matched based on similarity comparisons",
        })
        if (questionIndex === game.questions.length - 1) {
          endGame()
          setHasEnded(true)
          return
        }
        setQuestionIndex((prev) => prev + 1)
      }
    })
  }, [checkAnswer, toast, isLoading, questionIndex, game.questions.length, endGame]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleNext();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleNext])

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          You Completed in {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link
          href={`/statistics/${game.id}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          View Statistics
          <BarChart className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* topic */}
          <p>
            <span className="text-slate-400">Topic</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
        {/* <MCQCounter
                correct_answers={correctAnswers}
                wrong_answers={wrongAnswers}
            /> */}
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        <BlankAnswerInput answer={currentQuestion.answer} setBlankAnswer={setBlankAnswer} />
        <Button
          variant="default"
          className="mt-2"
          size="lg"
          disabled={isLoading}
          onClick={() => {
            handleNext()
          }}
        >
          {isLoading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default OpenEnded