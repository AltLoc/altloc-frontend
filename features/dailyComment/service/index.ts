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
  { label: "Very Bad", score: "VERY_BAD", emoji: "😡" },
  { label: "Bad", score: "BAD", emoji: "😔" },
  { label: "Neutral", score: "NEUTRAL", emoji: "😐" },
  { label: "Good", score: "GOOD", emoji: "😊" },
  { label: "Very Good", score: "VERY_GOOD", emoji: "🤩" },
];

export const DailyCommentBodySchema = z.object({
  id: z.string().uuid().optional(),
  content: z.string().min(6).max(500),
  mood: z.enum(["VERY_BAD", "BAD", "NEUTRAL", "GOOD", "VERY_GOOD"]),
});

export type DailyCommentBody = z.infer<typeof DailyCommentBodySchema>;

export const useDailyCommentMutation = () =>
  useMutation({
    mutationFn: async (options: { body: DailyCommentBody }) => {
      const res = await fetch("/api/app/daily-comment", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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
