import {z} from "zod";

export const createNoteSchema = z.object({
    title: z.string(),
    body: z.string(),
    tags: z.array(z.string())
});