// "use client";
// import { cn } from "@/lib/utils";
// import { Chapter } from "@prisma/client";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import React from "react";
// import { useToast } from "./ui/use-toast";
// import { Loader2 } from "lucide-react";

// type Props = {
//   chapter: Chapter;
//   chapterIndex: number;
//   completedChapters: Set<String>;
//   setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
// };

// export type ChapterCardHandler = {
//   triggerLoad: () => void;
// };

// const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
//   ({ chapter, chapterIndex, setCompletedChapters, completedChapters }, ref) => {
//     const [isLoading, setIsLoading] = React.useState(false);
//     const { toast } = useToast();
//     const [success, setSuccess] = React.useState<boolean | null>(null);
//     const { mutate: getChapterInfo, isPending } = useMutation({
//       mutationFn: async () => {
//         setIsLoading(true);
//         const response = await axios.post("/api/chapter/getInfo", {
//           chapterId: chapter.id,
//         });
//         setIsLoading(false);
//         console.log("Response: ", response.data);
//         return response.data;
//       },
//     });

//     const addChapterIdToSet = React.useCallback(() => {
//       setCompletedChapters((prev) => {
//         const newSet = new Set(prev);
//         newSet.add(chapter.id);
//         return newSet;
//       });
//     }, [chapter.id, setCompletedChapters]);

//     React.useEffect(() => {
//       if (chapter.videoId) {
//         setSuccess(true);
//         addChapterIdToSet();
//       }
//     }, [chapter.videoId, addChapterIdToSet]);

//     React.useImperativeHandle(ref, () => ({
//       async triggerLoad() {
//         if (chapter.videoId) {
//           addChapterIdToSet();
//           return;
//         }
//         getChapterInfo(undefined, {
//           onSuccess: () => {
//             setSuccess(true);
//             addChapterIdToSet();
//           },
//           onError: (error) => {
//             console.error(error);
//             setSuccess(true);
//             // toast({
//             //   title: "Error",
//             //   description: "There was an error loading your chapter",
//             //   variant: "destructive",
//             // });
//             addChapterIdToSet();
//           },
//         });
//       },
//     }));
//     return (
//       <div
//         key={chapter.id}
//         className={cn("px-4 py-2 mt-2 rounded flex justify-between", {
//           "bg-secondary": success === null,
//           "bg-green-400": success === false,
//           "bg-green-500": success === true,
//         })}
//       >
//         <h5>{chapter.name}</h5>
//         {isLoading && <Loader2 className="animate-spin" />}
//       </div>
//     );
//   }
// );

// ChapterCard.displayName = "ChapterCard";

// export default ChapterCard;

import { cn } from "@/lib/utils";
import axios from "axios";
import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import { Chapter } from "@prisma/client";

type Props = {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<String>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
};

export type ChapterCardHandler = {
  triggerLoad: () => void;
};

const ChapterCard = forwardRef<ChapterCardHandler, Props>(
  ({ chapter, chapterIndex, setCompletedChapters, completedChapters }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);
    const { toast } = useToast();

    const addChapterIdToSet = useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [chapter.id, setCompletedChapters]);

    useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet();
      }
    }, [chapter.videoId, addChapterIdToSet]);

    const triggerLoad = async () => {
      if (chapter.videoId) {
        addChapterIdToSet();
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.post("/api/chapter/getInfo", {
          chapterId: chapter.id,
        });
        setIsLoading(false);
        console.log("Response: ", response.data);
        setSuccess(true);
        addChapterIdToSet();
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setSuccess(true);
        // toast({
        //   title: "Error",
        //   description: "There was an error loading your chapter",
        //   variant: "destructive",
        // });
        addChapterIdToSet();
      }
    };

    const handlerRef = useRef<ChapterCardHandler>({ triggerLoad });

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(handlerRef.current);
        } else {
          ref.current = handlerRef.current;
        }
      }
    }, [ref]);

    return (
      <div
        key={chapter.id}
        className={cn("px-4 py-2 mt-2 rounded flex justify-between", {
          "bg-secondary": success === null,
          "bg-green-400": success === false,
          "bg-green-500": success === true,
        })}
      >
        <h5>{chapter.name}</h5>
        {isLoading && <Loader2 className="animate-spin" />}
      </div>
    );
  }
);

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;

