import { queryOptions, useMutation, useQueryClient } from "@tanstack/vue-query";
import { z } from "zod";
import { FetchError } from "@/utils/fetch";
import type { DailyComment } from "@/features/dailyComment/model";

const errorSchema = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
    })
  ),
});

export const moodOptions = [
  { value: "VERY_BAD", label: "Very bad", emoji: "😡" },
  { value: "BAD", label: "Bad", emoji: "😔" },
  { value: "NEUTRAL", label: "Neutral", emoji: "😐" },
  { value: "GOOD", label: "Good", emoji: "😊" },
  { value: "VERY_GOOD", label: "Very good", emoji: "🤩" },
] as const;

export type Mood = (typeof moodOptions)[number]["value"];

export const updateDailyCommentBodySchema = z
  .object({
    id: z.string().uuid().optional(),
    content: z.string().min(6).max(100),
    mood: z
      .enum(moodOptions.map((m) => m.value) as [Mood, ...Mood[]])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.id && !data.mood) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mood is required when creating a comment.",
        path: ["mood"],
      });
    }
  });

export type DailyCommentBody = z.infer<typeof updateDailyCommentBodySchema>;

export const useDailyCommentMutation = () =>
  useMutation({
    mutationFn: async (options: { body: DailyCommentBody }) => {
      const res = await fetch("/api/app/daily-comment", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
        body: JSON.stringify(options.body),
      });
      if (!res.ok) {
        const errors = errorSchema.parse(await res.json()).errors;
        throw new Error(errors.at(0)?.message);
      }
      return;
    },
  });

export const fetchDailyComments = queryOptions({
  queryKey: ["api", "app", "dialys", "comments"],
  queryFn: async ({ signal }) => {
    const res = await fetch("/api/app/daily-comments", { signal });

    if (!res.ok) {
      throw new FetchError(res);
    }

    return res.json() as Promise<DailyComment[]>;
  },
});

export const getDailyCommentQuery = (dailyCommentId: string) =>
  queryOptions({
    queryKey: ["api", "app", "daily", "comment", dailyCommentId],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/app/daily-comment/${dailyCommentId}`, {
        signal,
      });
      if (!res.ok) {
        throw new FetchError(res);
      }
      return res.json() as Promise<DailyComment>;
    },
  });

export function useDeleteDailyCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dailyCommentId: string) => {
      const res = await fetch(`/api/app/daily-comment/${dailyCommentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new FetchError(res);
      }
    },
    onSuccess: (_, dailyCommentId: string) => {
      queryClient.invalidateQueries(fetchDailyComments);
    },
  });
}
